import { Card, Statistic } from 'antd';

export function StatCard({ title, value }: { title: string; value: number }) {
  return <Card className="soft-card"><Statistic title={title} value={value} /></Card>;
}
