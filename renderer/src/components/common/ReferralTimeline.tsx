import { Timeline } from 'antd';
import { Referral } from '../../../../shared/types/entities';

export function ReferralTimeline({ referrals }: { referrals: Referral[] }) {
  return <Timeline items={referrals.flatMap((referral) => referral.feedback.map((item) => ({ children: `${item.date} ${item.content}` })))} />;
}
