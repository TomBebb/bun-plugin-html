import { pathToFileURL } from "url"
import htmlPlugin from "../plugin"
import path from "path"
console.log(import.meta.dir)
await Bun.build({
     entrypoints: [
         path.join(import.meta.dir, "my.html")
     ],
     outdir: path.join(import.meta.dir, "dist"),
     plugins: [
      htmlPlugin,
     ]
})