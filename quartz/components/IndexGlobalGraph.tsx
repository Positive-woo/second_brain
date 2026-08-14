import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { D3Config } from "./Graph"

export default (() => {
  const IndexGlobalGraph: QuartzComponent = (_props: QuartzComponentProps) => {
    const globalConfig: D3Config = {
      drag: true,
      zoom: true,
      depth: -1,
      scale: 0.9,
      repelForce: 0.5,
      centerForce: 0.3,
      linkDistance: 35,
      fontSize: 0.65,
      opacityScale: 1,
      showTags: true,
      removeTags: [],
      focusOnHover: true,
      enableRadial: true,
    }
    return (
      <div class="index-global-graph">
        <div class="graph-container" data-cfg={JSON.stringify(globalConfig)}></div>
      </div>
    )
  }

  return IndexGlobalGraph
}) satisfies QuartzComponentConstructor
