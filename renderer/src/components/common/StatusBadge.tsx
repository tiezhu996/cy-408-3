import { Tag } from 'antd';
import { ReferralStatus } from '../../../../shared/types/enums';

const colors: Record<string, string> = {
  [ReferralStatus.Requested]: 'blue',
  [ReferralStatus.Submitted]: 'cyan',
  [ReferralStatus.Interviewing]: 'gold',
  [ReferralStatus.Passed]: 'green',
  [ReferralStatus.Rejected]: 'red',
  [ReferralStatus.Onboarded]: 'purple'
};

export function StatusBadge({ status }: { status: ReferralStatus | string }) {
  return <Tag color={colors[status] || 'default'}>{status}</Tag>;
}
