import { promises as fs } from 'fs';
import * as path from 'path';
import config from '../../config';

export async function getOpenSourceTips(): Promise<string> {
    return await readMarkdown('openSourceTips.md');
}

export async function getOpenSourceResources(): Promise<string> {
    return await readMarkdown('openSourceResources.md');
}

async function readMarkdown(fileName: string) {
    const filePath = path.resolve(path.join(config.TIPS_DIRECTORY, `/${fileName}`));
    return (await fs.readFile(filePath)).toString();
}
