import { Injectable } from '@nestjs/common';
import { On } from 'discord-nestjs';
import chalk from 'chalk';
import fs from 'fs';

process.on('error', (e) => {
  console.log(chalk.red('Error: ') + chalk.bold(e.code) + ': ' + e.message);
  const etime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const fname =
    '.httpserver-' + etime.split(' ')[0] + '-' + etime.split(' ')[1];
  fs.writeFileSync(fname, JSON.stringify(e));
  //process.exit(1);
});

@Injectable()
export class AppService {
  @On({ event: 'ready' })
  OnReady() {
    console.log('Eddiebot started successfully');
  }
}
