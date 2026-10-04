import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

import style from "../styles/listPage.scss"
import thumbnailStyle from "../styles/thumbnailList.scss"
import { PageList, SortFn, byDateAndAlphabeticalFolderFirst } from "../PageList"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n"
import { QuartzPluginData } from "../../plugins/vfile"
import { ComponentChildren } from "preact"
import { concatenateResources } from "../../util/resources"
import { trieFromAllFiles } from "../../util/ctx"
import { resolveRelative } from "../../util/path"
import { Date as DateComponent, getDate } from "../Date"

// 썸네일 카드 그리드로 보여줄 섹션(폴더 slug 최상위 세그먼트)
const THUMBNAIL_SECTIONS = new Set(["03_Books", "04_Movies", "05_Wine"])

function resolveThumbnail(fromSlug: string, raw: unknown): string | undefined {
  if (typeof raw !== "string" || raw.length === 0) return undefined
  // 외부 URL / 루트 절대경로는 그대로, 그 외에는 현재 페이지 기준 상대경로로 해석
  if (/^(https?:)?\/\//.test(raw) || raw.startsWith("/")) return raw
  return resolveRelative(fromSlug as any, raw as any)
}

interface FolderContentOptions {
  /**
   * Whether to display number of folders
   */
  showFolderCount: boolean
  showSubfolders: boolean
  sort?: SortFn
}

const defaultOptions: FolderContentOptions = {
  showFolderCount: true,
  showSubfolders: true,
}

export default ((opts?: Partial<FolderContentOptions>) => {
  const options: FolderContentOptions = { ...defaultOptions, ...opts }

  const FolderContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props

    const trie = (props.ctx.trie ??= trieFromAllFiles(allFiles))
    const folder = trie.findNode(fileData.slug!.split("/"))
    if (!folder) {
      return null
    }

    const allPagesInFolder: QuartzPluginData[] =
      folder.children
        .map((node) => {
          // regular file, proceed
          if (node.data) {
            return node.data
          }

          if (node.isFolder && options.showSubfolders) {
            // folders that dont have data need synthetic files
            const getMostRecentDates = (): QuartzPluginData["dates"] => {
              let maybeDates: QuartzPluginData["dates"] | undefined = undefined
              for (const child of node.children) {
                if (child.data?.dates) {
                  // compare all dates and assign to maybeDates if its more recent or its not set
                  if (!maybeDates) {
                    maybeDates = { ...child.data.dates }
                  } else {
                    if (child.data.dates.created > maybeDates.created) {
                      maybeDates.created = child.data.dates.created
                    }

                    if (child.data.dates.modified > maybeDates.modified) {
                      maybeDates.modified = child.data.dates.modified
                    }

                    if (child.data.dates.published > maybeDates.published) {
                      maybeDates.published = child.data.dates.published
                    }
                  }
                }
              }
              return (
                maybeDates ?? {
                  created: new Date(),
                  modified: new Date(),
                  published: new Date(),
                }
              )
            }

            return {
              slug: node.slug,
              dates: getMostRecentDates(),
              frontmatter: {
                title: node.displayName,
                tags: [],
              },
            }
          }
        })
        .filter((page) => page !== undefined) ?? []
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = cssClasses.join(" ")
    const listProps = {
      ...props,
      sort: options.sort,
      allFiles: allPagesInFolder,
    }

    const content = (
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    ) as ComponentChildren

    const section = fileData.slug?.split("/")[0] ?? ""
    const useThumbnails = THUMBNAIL_SECTIONS.has(section)

    const sorter = options.sort ?? byDateAndAlphabeticalFolderFirst(cfg)
    const sortedPages = [...allPagesInFolder].sort(sorter)

    const listing = useThumbnails ? (
      <ul class="thumbnail-grid">
        {sortedPages.map((page) => {
          const title = page.frontmatter?.title ?? "제목 없음"
          const href = resolveRelative(fileData.slug!, page.slug!)
          const thumb = resolveThumbnail(fileData.slug!, page.frontmatter?.socialImage)
          return (
            <li>
              <a href={href} class="thumbnail-card internal">
                <div class="thumbnail-image">
                  {thumb ? (
                    <img src={thumb} alt={title} loading="lazy" />
                  ) : (
                    <div class="thumbnail-placeholder">
                      <span>{title.trim().charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div class="thumbnail-info">
                  <h3>{title}</h3>
                  {page.dates && (
                    <p class="thumbnail-date">
                      <DateComponent date={getDate(cfg, page)!} locale={cfg.locale} />
                    </p>
                  )}
                </div>
              </a>
            </li>
          )
        })}
      </ul>
    ) : (
      <PageList {...listProps} />
    )

    return (
      <div class="popover-hint">
        <article class={classes}>{content}</article>
        <div class="page-listing">
          {options.showFolderCount && (
            <p>
              {i18n(cfg.locale).pages.folderContent.itemsUnderFolder({
                count: allPagesInFolder.length,
              })}
            </p>
          )}
          <div>{listing}</div>
        </div>
      </div>
    )
  }

  FolderContent.css = concatenateResources(style, PageList.css, thumbnailStyle)
  return FolderContent
}) satisfies QuartzComponentConstructor
