import { useEffect } from 'react';
import { Card, Descriptions } from 'antd';
import { useParams } from 'react-router-dom';
import { ReferralTimeline } from '../components/common/ReferralTimeline';
import { ReminderList } from '../components/common/ReminderList';
import { useContactStore } from '../stores/contact';
import { useReferralStore } from '../stores/referral';
import { useReminderStore } from '../stores/reminder';

export function ContactDetail() {
  const { id } = useParams();
  const contacts = useContactStore((state) => state.contacts);
  const loadContacts = useContactStore((state) => state.load);
  const { referrals, load: loadReferrals } = useReferralStore();
  const { reminders, load: loadReminders } = useReminderStore();
  useEffect(() => { void loadContacts(); void loadReferrals(); void loadReminders(); }, [loadContacts, loadReferrals, loadReminders]);
  const contact = contacts.find((item) => item.id === id) || contacts[0];
  if (!contact) return null;
  const relatedReferrals = referrals.filter((item) => item.contactId === contact.id);
  return (
    <div className="stack">
      <Card title={contact.name}>
        <Descriptions items={[
          { key: 'company', label: '公司', children: contact.company },
          { key: 'position', label: '职位', children: contact.position },
          { key: 'email', label: '邮箱', children: contact.email },
          { key: 'wechat', label: '微信', children: contact.wechat }
        ]} />
      </Card>
      <Card title="内推进度时间线"><ReferralTimeline referrals={relatedReferrals} /></Card>
      <Card title="相关提醒"><ReminderList reminders={reminders.filter((item) => item.contactId === contact.id)} /></Card>
    </div>
  );
}
