import { ipcMain } from 'electron';
import { ReminderRepository } from '../repositories/reminder';

export function registerReminderHandlers() {
  const repo = new ReminderRepository();
  ipcMain.handle('reminders:list', () => repo.list());
  ipcMain.handle('reminders:save', (_event, reminder) => repo.save(reminder));
}
