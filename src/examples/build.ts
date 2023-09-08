import htmlPlugin from "../plugin"
import path from "path"
await Bun.build({
    root: import.meta.dir,
    splitting: true,
    //minify: true,
     entrypoints: [
         path.join(import.meta.dir, "my.html")
     ],
     outdir: path.join(import.meta.dir, "dist"),
     plugins: [
      htmlPlugin,
     ]
}).catch(console.error)