import path from 'node:path';
import { app, BrowserWindow } from 'electron';
import { registerContactHandlers } from './handlers/contact';
import { registerGraphHandlers } from './handlers/graph';
import { registerReferralHandlers } from './handlers/referral';
import { registerReminderHandlers } from './handlers/reminder';
import { startReminderScheduler } from './scheduler';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    webPreferences: {
      preload: path.join(__dirname, '../preload/ipc.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  if (!app.isPackaged) {
    win.loadURL('http://localhost:28314');
  } else {
    win.loadFile(path.join(__dirname, '../renderer/dist/index.html'));
  }
}

app.whenReady().then(() => {
  registerContactHandlers();
  registerReferralHandlers();
  registerGraphHandlers();
  registerReminderHandlers();
  startReminderScheduler();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
