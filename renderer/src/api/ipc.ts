import dayjs from 'dayjs';
import { GroupedReminders, Reminder, ReminderWithContact } from '../../../shared/types/entities';
import { ReminderStatus } from '../../../shared/types/enums';

export async function invokeIPC<T>(channel: string, ...args: unknown[]): Promise<T> {
  if (window.referralAPI) {
    return window.referralAPI.invoke<T>(channel, ...args);
  }
  return mockInvoke(channel, ...args) as T;
}

function buildGroupedReminders(): GroupedReminders {
  const rawReminders: Reminder[] = JSON.parse(localStorage.getItem('mock:reminders:list') || '[]');
  const rawContacts: Array<{ id: string; name: string; avatar?: string }> = JSON.parse(localStorage.getItem('mock:contacts:list') || '[]');
  const contactMap = new Map(rawContacts.map((c) => [c.id, c]));

  const now = dayjs();
  const todayStart = now.startOf('day');
  const todayEnd = now.endOf('day');
  const weekEnd = now.endOf('week');

  const overdue: ReminderWithContact[] = [];
  const today: ReminderWithContact[] = [];
  const thisWeek: ReminderWithContact[] = [];

  rawReminders
    .filter((r) => r.status === ReminderStatus.Pending)
    .forEach((r) => {
      const contact = contactMap.get(r.contactId);
      const item: ReminderWithContact = {
        ...r,
        contactName: contact?.name ?? '未知联系人',
        contactAvatar: contact?.avatar
      };
      const remindAt = dayjs(r.remindAt);
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

async function mockInvoke(channel: string, ...args: unknown[]): Promise<unknown> {
  const storeKey = `mock:${channel}`;
  if (channel.endsWith(':save')) {
    const listChannel = channel.replace(':save', ':list');
    const current = JSON.parse(localStorage.getItem(`mock:${listChannel}`) || '[]');
    const payload = args[0];
    const next = current.filter((item: any) => item.id !== (payload as any).id).concat(payload);
    localStorage.setItem(`mock:${listChannel}`, JSON.stringify(next));
    return payload;
  }
  if (channel === 'reminders:updateStatus') {
    const [id, status] = args as [string, string];
    const listChannel = 'reminders:list';
    const current = JSON.parse(localStorage.getItem(`mock:${listChannel}`) || '[]');
    const next = current.map((item: any) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(`mock:${listChannel}`, JSON.stringify(next));
    return undefined;
  }
  if (channel === 'reminders:groupedList') {
    return buildGroupedReminders();
  }
  const existing = localStorage.getItem(storeKey);
  if (existing) return JSON.parse(existing);
  return [];
}
