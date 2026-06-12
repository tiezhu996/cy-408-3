import { create } from 'zustand';
import { GroupedReminders, Reminder } from '../../../shared/types/entities';
import { ReminderStatus } from '../../../shared/types/enums';
import { invokeIPC } from '../api/ipc';

interface ReminderState {
  reminders: Reminder[];
  groupedReminders: GroupedReminders;
  load: () => Promise<void>;
  save: (reminder: Reminder) => Promise<void>;
  loadGrouped: () => Promise<void>;
  updateStatus: (id: string, status: ReminderStatus) => Promise<void>;
}

export const useReminderStore = create<ReminderState>((set) => ({
  reminders: [],
  groupedReminders: { overdue: [], today: [], thisWeek: [] },
  load: async () => set({ reminders: await invokeIPC<Reminder[]>('reminders:list') }),
  save: async (reminder) => {
    await invokeIPC<Reminder>('reminders:save', reminder);
    set((state) => ({ reminders: state.reminders.filter((item) => item.id !== reminder.id).concat(reminder) });
  },
  loadGrouped: async () => set({ groupedReminders: await invokeIPC<GroupedReminders>('reminders:groupedList') }),
  updateStatus: async (id, status) => {
    await invokeIPC<void>('reminders:updateStatus', id, status);
    set((state) => {
      const updated = state.reminders.map((item) => (item.id === id ? { ...item, status } : item));
      const filtered = {
        overdue: state.groupedReminders.overdue.filter((item) => item.id !== id),
        today: state.groupedReminders.today.filter((item) => item.id !== id),
        thisWeek: state.groupedReminders.thisWeek.filter((item) => item.id !== id)
      };
      return { reminders: updated, groupedReminders: filtered };
    });
  }
}));
