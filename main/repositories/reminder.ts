import dayjs from 'dayjs';
import { GroupedReminders, Reminder, ReminderWithContact } from '../../shared/types/entities';
import { ReminderStatus } from '../../shared/types/enums';
import { getDatabase } from '../database';

const seed: Reminder[] = [
  { id: 'reminder-1', contactId: 'contact-1', content: '跟进二面反馈', remindAt: '2026-06-12 10:00', status: ReminderStatus.Pending },
  { id: 'reminder-2', contactId: 'contact-1', content: '发送感谢信', remindAt: '2026-06-10 14:00', status: ReminderStatus.Pending },
  { id: 'reminder-3', contactId: 'contact-1', content: '约下周咖啡', remindAt: '2026-06-15 16:00', status: ReminderStatus.Pending },
  { id: 'reminder-4', contactId: 'contact-1', content: '确认内推进展', remindAt: '2026-06-18 11:00', status: ReminderStatus.Pending }
];

export class ReminderRepository {
  list(): Reminder[] {
    const db = getDatabase();
    const count = db.prepare('SELECT COUNT(*) AS total FROM reminders').get() as { total: number };
    if (count.total === 0) seed.forEach((item) => this.save(item));
    return db.prepare('SELECT * FROM reminders ORDER BY remindAt ASC').all() as Reminder[];
  }

  save(reminder: Reminder): Reminder {
    getDatabase()
      .prepare(`INSERT OR REPLACE INTO reminders VALUES (@id,@contactId,@content,@remindAt,@status)`)
      .run(reminder);
    return reminder;
  }

  updateStatus(id: string, status: ReminderStatus): void {
    getDatabase()
      .prepare('UPDATE reminders SET status = ? WHERE id = ?')
      .run(status, id);
  }

  getGroupedList(): GroupedReminders {
    const db = getDatabase();
    const count = db.prepare('SELECT COUNT(*) AS total FROM reminders').get() as { total: number };
    if (count.total === 0) seed.forEach((item) => this.save(item));

    const rows = db.prepare(`
      SELECT r.*, c.name AS contactName, c.avatar AS contactAvatar
      FROM reminders r
      LEFT JOIN contacts c ON r.contactId = c.id
      WHERE r.status = ?
      ORDER BY r.remindAt ASC
    `).all(ReminderStatus.Pending) as Array<Reminder & { contactName: string; contactAvatar?: string }>;

    const now = dayjs();
    const todayStart = now.startOf('day');
    const todayEnd = now.endOf('day');
    const weekEnd = now.endOf('week');

    const overdue: ReminderWithContact[] = [];
    const today: ReminderWithContact[] = [];
    const thisWeek: ReminderWithContact[] = [];

    rows.forEach((row) => {
      const remindAt = dayjs(row.remindAt);
      const item: ReminderWithContact = {
        id: row.id,
        contactId: row.contactId,
        content: row.content,
        remindAt: row.remindAt,
        status: row.status,
        contactName: row.contactName,
        contactAvatar: row.contactAvatar || undefined
      };

      if (remindAt.isBefore(todayStart)) {
        overdue.push(item);
      } else if (remindAt.isBefore(todayEnd)) {
        today.push(item);
      } else if (remindAt.isBefore(weekEnd)) {
        thisWeek.push(item);
      }
    });

    return { overdue, today, thisWeek };
  }
}
