import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import { Date, getDate } from "./Date"
import { resolveRelative } from "../util/path"
import style from "./styles/homepageDailyNews.scss"

interface Options {
  limit: number
}

const defaultOptions: Options = {
  limit: 3,
}

function buildSummary(page: QuartzPluginData): string {
  const source = typeof page.frontmatter?.source === "string" ? page.frontmatter.source : ""
  if (source) {
    return `${source} 기사 정리와 생각 기록`
  }
  return "최근 정리한 AI 기사"
}

export default ((userOpts?: Partial<Options>) => {
  const HomepageDailyNews: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
    const opts = { ...defaultOptions, ...userOpts }
    const pages = allFiles
      .filter((page) => (page.frontmatter?.tags ?? []).includes("daily-news"))
      .sort(byDateAndAlphabetical(cfg))
      .slice(0, opts.limit)

    const cards = pages.map((page) => {
        const title = page.frontmatter?.title ?? "제목 없음"
        const source = typeof page.frontmatter?.source === "string" ? page.frontmatter.source : "Daily AI News"
        const href = resolveRelative(fileData.slug!, page.slug!)
        const summary = buildSummary(page)
        const date = page.dates ? (
          <Date date={getDate(cfg, page)!} locale={cfg.locale} />
        ) : (
          "최근 수정"
        )

        return (
          <a href={href} class="daily-ai-news-card internal">
            <div class="daily-ai-news-body">
              <p class="daily-ai-news-source">{source}</p>
              <h3>{title}</h3>
              <p class="daily-ai-news-summary">{summary}</p>
              <span class="daily-ai-news-date">{date}</span>
            </div>
          </a>
        )
      })

    return (
      <div id="homepage-daily-news-template" class="homepage-daily-news-template" aria-hidden="true">
        <div class="daily-ai-news-grid">{cards}</div>
      </div>
    )
  }

  HomepageDailyNews.afterDOMLoaded = `
    const host = document.getElementById("daily-ai-news-home")
    const template = document.getElementById("homepage-daily-news-template")
    if (host && template) {
      host.innerHTML = template.innerHTML
    }
  `

  HomepageDailyNews.css = style
  return HomepageDailyNews
}) satisfies QuartzComponentConstructor<Partial<Options> | undefined>
