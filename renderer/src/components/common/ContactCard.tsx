import { Avatar, Card, Space, Tag, Typography } from 'antd';
import { Contact } from '../../../../shared/types/entities';

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <Card className="soft-card">
      <Space align="start">
        <Avatar src={contact.avatar}>{contact.name.slice(0, 1)}</Avatar>
        <div>
          <Typography.Title level={5}>{contact.name}</Typography.Title>
          <Typography.Text type="secondary">{contact.company} · {contact.position}</Typography.Text>
          <div className="tag-row">{contact.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
        </div>
      </Space>
    </Card>
  );
}
