import { MessageEmbed, Message } from 'discord.js';
import { scheduleJob } from '../scheduler.service';
import { log } from '../logger';

const ARG_SEPARATOR = '||';
const CLOCK_EMOJI = ':alarm_clock:';

/**
 * This command lets the user set reminders for themselves, specifying the message they want to receive and the date
 * and time they want to receive it.
 */
export const command = async (arg: string, embed: MessageEmbed, message: Message) => {
    const [dateString, reminderMessage] = arg.split(ARG_SEPARATOR);

    if (!reminderMessage || !dateString) {
        return buildErrorMessage('Missing arguments');
    }

    try {
        // TODO: maybe use a 3rd party package (e.g. moment) to parse more date formats
        const dateTimestamp = Date.parse(dateString);
        if (isNaN(dateTimestamp)) {
            return buildErrorMessage('The provided date format on the second parameter is not valid, please use the ISO format.');
        }

        // Schedule the reminder and use the user's id for logging purposes
        const jobName = `reminder-${message.author.id}`;
        scheduleJob(dateTimestamp, reminderCallback, jobName);

        return embed.setTitle(`${CLOCK_EMOJI} Reminder set successfully`)
    } catch (e) {
        const errorMsg = 'An error occurred while setting a reminder';
        log.error(errorMsg, e);

        return buildErrorMessage(errorMsg);
    }


    // Send the reminder message to the user that created the reminder.
    async function reminderCallback() {
        try {
            await message.author.send(`${CLOCK_EMOJI} Hey, just to remind you: **${reminderMessage}**`);
        } catch (e) {
            log.error(`ERROR: Sending the reminder message to the user with id: ${message.author.id}`, e.message);
            log.error(e);
        }
    }

    function buildErrorMessage(errorMsg: string) {
        return embed
            .setTitle('Reminder (error)')
            .setDescription(description)
            .addField('ERROR', errorMsg)
            .addField('Usage', usage);
    }
}

export const description = 'Set reminders for yourself.';

export const triggers = ['reminder', 'rem'];

export const usage = `${triggers[0]} <date and time> ${ARG_SEPARATOR} <reminder message>`;
