import { Card, Typography } from 'antd';
import { Referral } from '../../../../shared/types/entities';
import { StatusBadge } from './StatusBadge';

export function ReferralCard({ referral }: { referral: Referral }) {
  return (
    <Card className="soft-card">
      <Typography.Title level={5}>{referral.targetCompany}</Typography.Title>
      <Typography.Text>{referral.targetPosition}</Typography.Text>
      <div className="card-footer"><StatusBadge status={referral.status} /></div>
    </Card>
  );
}
