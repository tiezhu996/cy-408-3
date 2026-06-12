import { List } from 'antd';
import { Referral } from '../../../../shared/types/entities';

export function FeedbackList({ referral }: { referral: Referral }) {
  return <List size="small" dataSource={referral.feedback} renderItem={(item) => <List.Item>{item.date}：{item.content}</List.Item>} />;
}
