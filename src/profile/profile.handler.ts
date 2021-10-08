import { Injectable } from '@nestjs/common';
import { OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';

@Injectable()
export class ProfileHandler {
    constructor() { }

    @OnCommand({ name: 'profile' })
    handleProfile(message: Message) {
        const args = message.content.trim().split(/ +/g);
        //TODO check if user already exists
        //Create User
        //Update User
    }
}
