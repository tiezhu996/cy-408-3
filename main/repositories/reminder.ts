import { Reminder } from '../../shared/types/entities';
import { ReminderStatus } from '../../shared/types/enums';
import { getDatabase } from '../database';

const seed: Reminder[] = [
  { id: 'reminder-1', contactId: 'contact-1', content: '跟进二面反馈', remindAt: '2026-06-12 10:00', status: ReminderStatus.Pending }
];

export class ReminderRepository {
  list(): Reminder[] {
    const db = getDatabase();
    const count = db.prepare('SELECT COUNT(*) AS total FROM reminders').get() as { total: number };
    if (count.total === 0) seed.forEach((item) => this.save(item));
    return db.prepare('SELECT * FROM reminders ORDER BY remindAt ASC').all() as Reminder[];
  }

  save(reminder: Reminder): Reminder {
    getDatabase().prepare('INSERT OR REPLACE INTO reminders VALUES (@id,@contactId,@content,@remindAt,@status)').run(reminder);
    return reminder;
  }
}
