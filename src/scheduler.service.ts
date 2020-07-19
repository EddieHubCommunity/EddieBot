import { scheduleJob as schedule } from 'node-schedule';
import { log } from './logger';

/**
 * Schedule the given job function to run in the periodicity specified with cronTime
 * @param timeRule cron expression that specifies when the job is ran or the date timestamp or a Date instance.
 * Check this link to know the format: https://www.npmjs.com/package/node-schedule#cron-style-scheduling
 * @param job callback function
 * @param jobName (optional) name for the job
 */
export function scheduleJob(timeRule: string | number | Date, job: () => Promise<void>, jobName?: string) {
  jobName = jobName ? ` ${jobName}` : '';
  log.info(`Scheduling the job${jobName}`);

  schedule(timeRule, async () => {
    try {
      log.info(`Running the job${jobName}`);
      await job();
      log.info(`Finished the job${jobName}`);
    } catch(e) {
      log.error('An error occurred:', e.message);
      throw e;
    }
  });
}
