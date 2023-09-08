import type { BuildConfig, BunPlugin } from "bun";
import fs from "fs/promises"
import { parse } from 'node-html-parser';
import path from "path"
import { BiteBuildConfig, FrontendProcessor } from "./resolver";
export const htmlProcessor: FrontendProcessor = async function process(args: BiteBuildConfig) {
    const dir = path.dirname( args.path)
    const content = await fs.readFile( args.path, "utf8")

    const parsed = parse(content)
    const scripts  = parsed.getElementsByTagName("script")

    const outDir = args.bun?.outdir ?? ""
    await Promise.all(scripts.map(async (script, i) => {
      const src =script.attrs.src
      if (src) {
        console.log("htmlscript src", src)

        const srcPath = src.startsWith("/") ? path.join(args.bun.root, src) : path.join(dir, src)

        console.log("bun build", srcPath)
        const res = await Bun.build({
          ...args.bun,
          entrypoints: [srcPath],
          outdir: path.join( outDir, path.dirname(script.attrs.src))
        })
        console.log("built", res)
        return;
      }

        const tempPath = path.join(dir, "__temp__"+i+".js")
       await fs.writeFile(tempPath, script.textContent)


       const conf: BuildConfig = {
        ...args.bun,
        entrypoints: [path.relative(dir, tempPath)],
        outdir:  path.join(dir, "dist")
       }
       console.log('bun build', tempPath, conf )
       await Bun.build(conf).catch(console.error)
       console.log('bun build done' )


       script.textContent = await fs.readFile(tempPath, 'utf8')
    })).catch(console.error)

    await fs.writeFile(path.join( outDir, path.basename(args.path)), parsed.toString(), "utf8")
    return {
      outputs: [],
      logs: [],
      success: true,
    }
  }