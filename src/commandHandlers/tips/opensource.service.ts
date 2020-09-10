import { promises as fs } from 'fs';
import * as path from 'path';
import config from '../../config';
// TODO: read the data for tips and resources from the DB. The idea is for this data to not be hardcoded, and can be
// modified throughout time, without needing to re-deploy the bot!

export async function getOpenSourceTips(): Promise<string> {
    const result = await readMarkdown('openSourceTips.md');
    return result;
}

export async function getOpenSourceResources(): Promise<string> {
    const result = await readMarkdown('openSourceResources.md');
    return result;
}

async function readMarkdown(fileName: string) {
    const filePath = path.resolve(path.join(config.TIPS_DIRECTORY, `/${fileName}`));
    return await (await fs.readFile(filePath)).toString();
}
