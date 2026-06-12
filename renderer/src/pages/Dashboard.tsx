import { useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import { ReminderList } from '../components/common/ReminderList';
import { StatCard } from '../components/common/StatCard';
import { useContactStore } from '../stores/contact';
import { useReferralStore } from '../stores/referral';
import { useReminderStore } from '../stores/reminder';

export function Dashboard() {
  const { contacts, load: loadContacts } = useContactStore();
  const { referrals, load: loadReferrals } = useReferralStore();
  const { reminders, load: loadReminders } = useReminderStore();
  useEffect(() => { void loadContacts(); void loadReferrals(); void loadReminders(); }, [loadContacts, loadReferrals, loadReminders]);
  return (
    <div className="stack">
      <Row gutter={16}>
        <Col span={8}><StatCard title="总联系人数" value={contacts.length} /></Col>
        <Col span={8}><StatCard title="进行中内推" value={referrals.filter((item) => ['requested', 'submitted', 'interviewing'].includes(item.status)).length} /></Col>
        <Col span={8}><StatCard title="待跟进提醒" value={reminders.length} /></Col>
      </Row>
      <Card title="近期待跟进"><ReminderList reminders={reminders} /></Card>
    </div>
  );
}
