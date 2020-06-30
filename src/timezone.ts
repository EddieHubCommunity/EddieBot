import { Message } from 'discord.js';
import * as moment from 'moment-timezone';

import config from './config';

const { defaultEmbed, TIMEZONES } = config;

export const timezone = async (message: Message) => {
    if (message.author.bot) {
        return;
    }

    const match = message.content.match(/([\d]{1,2})([:\d]{3})?[\s]?(pm|am|AM|PM)?\b[\s]([a-zA-Z]{3})?\b/);

    if (match) {
        const mentioned = match[0];
        const hour = match[1];
        const minutes = match[2];
        const dayNight = match[3];
        const zone = match[4];

        const proposedZone = TIMEZONES.find((item) => item.abbr === zone);

        if (proposedZone) {
            const initial = minutes ? moment.tz(`${hour}${minutes} ${dayNight}`, 'h:mm A', proposedZone.zone) : moment.tz(`${hour}${minutes} ${dayNight}`, 'h A', proposedZone.zone);

            const embed = defaultEmbed().setTitle('Popular timezones');
            const availableZones = TIMEZONES.filter((item) => item.abbr !== zone);

            embed.addField(mentioned, proposedZone!.zone);

            availableZones.forEach((item) => embed.addField(`${item.zone} (${item.abbr})`, initial.tz(item.zone).format('h:mma z')));

            return message.channel.send(embed);
        }
    }

    return;
};
