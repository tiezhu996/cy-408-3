import { create } from 'zustand';
import { Contact } from '../../../shared/types/entities';
import { invokeIPC } from '../api/ipc';

interface ContactState {
  contacts: Contact[];
  load: () => Promise<void>;
  save: (contact: Contact) => Promise<void>;
}

export const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  load: async () => set({ contacts: await invokeIPC<Contact[]>('contacts:list') }),
  save: async (contact) => {
    await invokeIPC<Contact>('contacts:save', contact);
    set((state) => ({ contacts: state.contacts.filter((item) => item.id !== contact.id).concat(contact) }));
  }
}));
