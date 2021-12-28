import { Injectable } from '@nestjs/common';
import { On } from 'discord-nestjs';
import chalk from 'chalk';
import fs from 'fs';

process.on("error", (e) => {
    console.log(
      chalk.red("Error: ")+
      chalk.bold(e.code)+ 
      ": " +
      e.message
      );
      let date = new Date();
    fs.writeFileSync("","");
    process.exit(1)
})

@Injectable()
export class AppService {
  @On({ event: 'ready' })
  OnReady() {
    console.log('Eddiebot started successfully');
  }
}
