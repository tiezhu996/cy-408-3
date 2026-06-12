import { Contact, GraphNode, GroupedReminders, Referral, Reminder } from './entities';
import { ReminderStatus } from './enums';

export interface IPCSchema {
  'contacts:list': () => Promise<Contact[]>;
  'contacts:save': (contact: Contact) => Promise<Contact>;
  'referrals:list': () => Promise<Referral[]>;
  'referrals:save': (referral: Referral) => Promise<Referral>;
  'graph:list': () => Promise<GraphNode[]>;
  'graph:save': (node: GraphNode) => Promise<GraphNode>;
  'reminders:list': () => Promise<Reminder[]>;
  'reminders:save': (reminder: Reminder) => Promise<Reminder>;
  'reminders:groupedList': () => Promise<GroupedReminders>;
  'reminders:updateStatus': (id: string, status: ReminderStatus) => Promise<void>;
}
