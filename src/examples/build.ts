
import path from "path"
import { buildFrontend } from "../resolver"
console.log(import.meta.dir)

await buildFrontend({
    path: 
    path.join(import.meta.dir, "my.html"),
    bun: {
        outdir: path.join(import.meta.dir, "dist"),
    }
})
