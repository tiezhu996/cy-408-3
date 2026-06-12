import { Notification } from 'electron';
import { Reminder } from '../shared/types/entities';

export function showReminder(reminder: Reminder) {
  if (Notification.isSupported()) {
    new Notification({ title: '内推跟进提醒', body: reminder.content }).show();
  }
}
