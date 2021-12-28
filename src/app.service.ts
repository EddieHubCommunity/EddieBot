import { Injectable } from '@nestjs/common';
import { On } from 'discord-nestjs';
import chalk from "chalk";

process.on("error", (e) => {
    console.log(chalk.red("Error"))
})

@Injectable()
export class AppService {
  @On({ event: 'ready' })
  OnReady() {
    console.log('Eddiebot started successfully');
  }
}
