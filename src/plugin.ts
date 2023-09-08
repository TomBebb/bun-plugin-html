import type { BunPlugin } from "bun";
import fs from "fs/promises"
import { parse } from 'node-html-parser';

 const htmlPlugin: BunPlugin = {
  name: "HTML Loader",
  setup(build) {
  build.onLoad({  filter: /.*\.html/}, async args => {
    const content = await fs.readFile( args.path, "utf8")

    const parsed = parse(content)
    const scripts  = parsed.getElementsByTagName("script")

    console.log('parsed', scripts.map(s => s.textContent))
    return {

      contents: parsed.toString()
    }
  })  
  },
}
export default htmlPlugin