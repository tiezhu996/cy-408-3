import { ipcMain } from 'electron';
import { ReminderStatus } from '../../shared/types/enums';
import { ReminderRepository } from '../repositories/reminder';

export function registerReminderHandlers() {
  const repo = new ReminderRepository();
  ipcMain.handle('reminders:list', () => repo.list());
  ipcMain.handle('reminders:save', (_event, reminder) => repo.save(reminder));
  ipcMain.handle('reminders:groupedList', () => repo.getGroupedList());
  ipcMain.handle('reminders:updateStatus', (_event, id: string, status: ReminderStatus) => repo.updateStatus(id, status));
}
