import { List } from 'antd';
import { Reminder } from '../../../../shared/types/entities';

export function ReminderList({ reminders }: { reminders: Reminder[] }) {
  return <List dataSource={reminders} renderItem={(item) => <List.Item>{item.remindAt} · {item.content}</List.Item>} />;
}
