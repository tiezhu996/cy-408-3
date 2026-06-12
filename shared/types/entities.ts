import { ReferralStatus, RelationType, ReminderStatus } from './enums';

export interface Contact {
  id: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  wechat: string;
  relationType: RelationType;
  tags: string[];
  avatar?: string;
  notes: string;
  lastContactAt: string;
}

export interface Referral {
  id: string;
  contactId: string;
  targetCompany: string;
  targetPosition: string;
  status: ReferralStatus;
  requestDate: string;
  resumePath?: string;
  feedback: Array<{ date: string; content: string }>;
}

export interface GraphNode {
  id: string;
  contactId: string;
  relatedContactIds: string[];
  strength: number;
  notes: string;
}

export interface Reminder {
  id: string;
  contactId: string;
  content: string;
  remindAt: string;
  status: ReminderStatus;
}

export interface ReminderWithContact extends Reminder {
  contactName: string;
  contactAvatar?: string;
}

export interface GroupedReminders {
  overdue: ReminderWithContact[];
  today: ReminderWithContact[];
  thisWeek: ReminderWithContact[];
}
