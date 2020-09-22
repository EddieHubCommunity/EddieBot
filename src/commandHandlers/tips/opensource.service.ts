import { promises as fs } from 'fs';
import * as path from 'path';
import config from '../../config';
import { log } from '../../logger';

export async function readMarkdown(fileName: string) {
    try {
        const filePath = path.resolve(path.join(config.TIPS.directory, fileName));
        return (await fs.readFile(filePath)).toString();
    } catch(e) {
        log.error(`ERROR: Could not read file: ${fileName} - ${e.message}`);
        return '';
    }
}
