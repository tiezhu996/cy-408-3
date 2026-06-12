import { ReminderStatus } from '../shared/types/enums';
import { showReminder } from './notification';
import { ReminderRepository } from './repositories/reminder';

export function startReminderScheduler() {
  const repo = new ReminderRepository();
  setInterval(() => {
    const now = Date.now();
    repo
      .list()
      .filter((item) => item.status === ReminderStatus.Pending && new Date(item.remindAt).getTime() <= now)
      .forEach(showReminder);
  }, 60_000);
}
