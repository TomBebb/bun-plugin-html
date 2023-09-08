import type { BunPlugin } from "bun";
import fs from "fs/promises"
import { parse } from 'node-html-parser';
import path from "path"
console.log('cwd',  import.meta.dir)
 const htmlPlugin: BunPlugin = {
  name: "HTML Loader",
  setup(build) {
  build.onLoad({  filter: /.*\.html/}, async args => {

    const rootDir = build.config.root ??".";
    const destDir =build.config.outdir ?? "."
    const dir = path.dirname( args.path)
    const parsed = parse(await fs.readFile( args.path, "utf8"))
    const scripts  = parsed.getElementsByTagName("script")

    const paths = [];
    await Promise.all(scripts.map(async (script, i) => {
      if (script.attrs.src) {
        paths.push(path.relative(destDir, path.join(dir,  script.attrs.src)))
        return
      }

        const tempPath = path.join(dir, "__temp__"+i+".js")
       await fs.writeFile(tempPath, script.textContent)
       paths.push(tempPath)

    })).catch(console.error)

    const content = parsed.toString()
    console.log(content, paths, rootDir)
    return {
      loader: "js",
      contents: `
      import "~/examples/demo";export const content = ${JSON.stringify(content)}`
    }
  })
  },
}
export default htmlPlugin