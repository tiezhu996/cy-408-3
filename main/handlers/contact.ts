import { ipcMain } from 'electron';
import { ContactRepository } from '../repositories/contact';

export function registerContactHandlers() {
  const repo = new ContactRepository();
  ipcMain.handle('contacts:list', () => repo.list());
  ipcMain.handle('contacts:save', (_event, contact) => repo.save(contact));
}
