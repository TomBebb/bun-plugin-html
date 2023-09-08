import type { BunPlugin } from "bun";
import fs from "fs/promises"
import { parse } from 'node-html-parser';
import path from "path"

 const htmlPlugin: BunPlugin = {
  name: "HTML Loader",
  setup(build) {
  build.onLoad({  filter: /.*\.html/}, async args => {
    const dir = path.dirname( args.path)
    const content = await fs.readFile( args.path, "utf8")

    const parsed = parse(content)
    const scripts  = parsed.getElementsByTagName("script")

    await Promise.all(scripts.map(async (script, i) => {

        const tempPath = path.join(dir, "__temp__"+i+".js")
       await fs.writeFile(tempPath, script.textContent)
       console.log('bun build', tempPath )


       await Bun.build({
        entrypoints: [""],
        outdir:  path.join(dir, ".dist")
       }).catch(console.error)
       console.log('bun build done' )


      // script.textContent = await fs.readFile(tempPath, 'utf8')
    })).catch(console.error)
    console.log(parsed.toString())
    return {

      contents: parsed.toString()
    }
  })  
  },
}
export default htmlPlugin