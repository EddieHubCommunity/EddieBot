import { Message } from 'discord.js';
import * as moment from 'moment-timezone';

import config from './config';

const { defaultEmbed, TIMEZONES } = config;

/**
 * Runs for every message
 * and checks for time and zone "1pm UTC" or "1:30pm UTC"
 * and replies with other options from the config
 *
 * @param message
 */
export const timezone = async (message: Message) => {
  if (message.author.bot) {
    return;
  }

  const match = message.content.match(
    /([\d]{1,2})([:\d]{3})?[\s]?(pm|am|AM|PM)?\b[\s]([a-zA-Z]{2,4})?\b/
  );

  if (match) {
    const [mentioned, hour, minutes, dayNight, zone] = match;

    if (!zone) {
      return;
    }

    const proposedZone = TIMEZONES.find(
      (item) => item.abbr === zone.toUpperCase()
    );

    if (proposedZone) {
      const initial = minutes
        ? moment.tz(
            `${hour}${minutes} ${dayNight}`,
            'h:mm A',
            proposedZone.zone
          )
        : moment.tz(`${hour}${minutes} ${dayNight}`, 'h A', proposedZone.zone);
      const embed = defaultEmbed(config.COLORS.system).setTitle(
        'Popular timezones'
      );
      const availableZones = TIMEZONES.filter((item) => item.abbr !== zone);

      embed.addField(mentioned, proposedZone!.zone);

      let zones = '';
      availableZones.forEach((item) => {
        zones = zones
          .concat(`**${item.zone} (${item.abbr})**: `)
          .concat(`${initial.tz(item.zone).format('h:mma z')}`)
          .concat('\n');
      });
      embed.addField('\u200b', zones);
      return message.channel.send(embed);
    }
  }

  return;
};
