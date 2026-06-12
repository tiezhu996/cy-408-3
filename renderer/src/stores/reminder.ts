import { create } from 'zustand';
import { Reminder } from '../../../shared/types/entities';
import { invokeIPC } from '../api/ipc';

interface ReminderState {
  reminders: Reminder[];
  load: () => Promise<void>;
  save: (reminder: Reminder) => Promise<void>;
}

export const useReminderStore = create<ReminderState>((set) => ({
  reminders: [],
  load: async () => set({ reminders: await invokeIPC<Reminder[]>('reminders:list') }),
  save: async (reminder) => {
    await invokeIPC<Reminder>('reminders:save', reminder);
    set((state) => ({ reminders: state.reminders.filter((item) => item.id !== reminder.id).concat(reminder) }));
  }
}));
