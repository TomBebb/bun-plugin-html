import fg from "fast-glob"
import { buildFrontends } from "./resolver"

const entries = await fg(process.argv.at(-1))
const rootDir = process.cwd()
await buildFrontends(entries, {
    bun: {
        root: rootDir,
    }
})