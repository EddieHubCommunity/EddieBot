import config from './config';
import { scheduleJob } from './scheduler.service';
import { getConfiguredGuild } from './commandHandlers/guild.service';
import { db } from './firebase';
import { UserSubscriptions } from './config';
import { log } from './logger';

export function scheduleOpenSourceReminder() {
    scheduleJob(config.OPENSOURCE_JOB_CRON_TIME, reminderCallback, 'opensource-reminder');
}

/**
 * Send a DM to users that are subscribed to this reminder with a message.
 * The user's subscriptions are kept on the "usersSubscriptions" DB collection.
 */
async function reminderCallback() {
    // TODO: use the GitHub API to check if the user has already contributed on this day.
    // TODO: if he has, then send a rewarding positive message instead of a reminder.

    // Get the list of users that are subscribed to the open source subscription
    const querySnapshot = await db.collection('usersSubscriptions').get();
    const userNamesToSendMessage = querySnapshot
        .docs
        .filter(doc => {
            const userSubscription = doc.data() as UserSubscriptionDb;
            return userSubscription.subscriptions.includes(UserSubscriptions.OPEN_SOURCE);
        })
        .map(doc => (doc.data() as UserSubscriptionDb).username);
    const guild = getConfiguredGuild();
    const allMembers = await guild!.members.fetch();
    const subscribedUsers = allMembers.filter(member => userNamesToSendMessage.includes(member.user.username));

    // Send the messages in parallel to subscribed users
    log.info(`Starting to send open source reminder messages to ${subscribedUsers.size} subscribed users`);
    const promises = subscribedUsers.map(member => {
        const userId = member.user.id;
        try {
            log.info(`Sending a open source reminder message to user ${userId}`, userId);
            member.user.send('Hey :wave:, this is a friendly reminder for you to contribute to open source today. Let\'s get those green squares together :smiley:!');
            return;
        } catch (e) {
            log.error(`ERROR: Sending the open source reminder message to the user with id: ${userId}`, e.message);
            log.error(e);

            // Note: we log that an error happened when sending a DM to the user, but we don't propagate the error
            // so that Promise.all doesn't get rejected.
            return;
        }
    })
    await Promise.all(promises);
    log.info('Succesfully sent open source reminder messages');
}

// This type represents the model/schema of a document in the "usersSubscriptions" collection
interface UserSubscriptionDb {
    subscriptions: string[]
    username: string
}
