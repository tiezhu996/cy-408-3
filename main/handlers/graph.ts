import { ipcMain } from 'electron';
import { GraphRepository } from '../repositories/graph';

export function registerGraphHandlers() {
  const repo = new GraphRepository();
  ipcMain.handle('graph:list', () => repo.list());
  ipcMain.handle('graph:save', (_event, node) => repo.save(node));
}
