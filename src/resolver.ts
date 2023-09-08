import { BuildConfig, BuildOutput, build } from "bun";
import { htmlProcessor } from "./html";
import path from "path"
export interface BiteBuildConfig  {
    
    bun?: Omit<BuildConfig, 'entrypoints'>
    path: string
}

export type FrontendBuildOutput = BuildOutput
export type FrontendProcessor = (conf: BiteBuildConfig) => Promise<FrontendBuildOutput>;
export async function buildFrontend(conf: BiteBuildConfig): Promise<FrontendBuildOutput> {
    const ext = path.extname(conf.path).substring(1)
    const matching = byExtension[ ext]
    if (!matching)
     throw new Error("Unrecognised Bite extension " +ext)

    return matching(conf)
}

export const byExtension = {
    html: htmlProcessor
}