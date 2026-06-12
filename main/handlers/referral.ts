import { ipcMain } from 'electron';
import { ReferralRepository } from '../repositories/referral';

export function registerReferralHandlers() {
  const repo = new ReferralRepository();
  ipcMain.handle('referrals:list', () => repo.list());
  ipcMain.handle('referrals:save', (_event, referral) => repo.save(referral));
}
