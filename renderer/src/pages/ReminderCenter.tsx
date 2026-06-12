import { useEffect } from 'react';
import { Avatar, Badge, Button, Card, Empty, List, Space, Tag, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, ClockCircleOutlined, BellOutlined, ExclamationCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { ReminderWithContact } from '../../../shared/types/entities';
import { ReminderStatus } from '../../../shared/types/enums';
import { useReminderStore } from '../stores/reminder';

interface SectionConfig {
  key: string;
  title: string;
  color: string;
  icon: React.ReactNode;
}

const SECTIONS: SectionConfig[] = [
  { key: 'overdue', title: '已逾期', color: 'red', icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} /> },
  { key: 'today', title: '今天', color: 'blue', icon: <ClockCircleOutlined style={{ color: '#1677ff' }} /> },
  { key: 'thisWeek', title: '本周', color: 'green', icon: <CalendarOutlined style={{ color: '#52c41a' }} /> }
];

export function ReminderCenter(): React.ReactElement {
  const navigate = useNavigate();
  const { groupedReminders, loadGrouped, updateStatus } = useReminderStore();

  useEffect((): void => {
    void loadGrouped();
  }, [loadGrouped]);

  const handleComplete = (id: string): void => {
    void updateStatus(id, ReminderStatus.Done);
  };

  const handleIgnore = (id: string): void => {
    void updateStatus(id, ReminderStatus.Ignored);
  };

  const handleAvatarClick = (contactId: string): void => {
    navigate(`/contacts/${contactId}`);
  };

  const formatTime = (remindAt: string): string => {
    return dayjs(remindAt).format('MM-DD HH:mm');
  };

  const getItemsByKey = (key: string): ReminderWithContact[] => {
    if (key === 'overdue') return groupedReminders.overdue;
    if (key === 'today') return groupedReminders.today;
    return groupedReminders.thisWeek;
  };

  const totalCount: number =
    groupedReminders.overdue.length + groupedReminders.today.length + groupedReminders.thisWeek.length;

  const overdueCount: number = groupedReminders.overdue.length;

  const renderReminderItem = (item: ReminderWithContact): React.ReactElement => (
    <List.Item
      key={item.id}
      className="reminder-item"
      actions={[
        <Button
          key="done"
          type="text"
          size="small"
          icon={<CheckOutlined />}
          onClick={(): void => handleComplete(item.id)}
        >
          完成
        </Button>,
        <Button
          key="ignore"
          type="text"
          size="small"
          danger
          icon={<CloseOutlined />}
          onClick={(): void => handleIgnore(item.id)}
        >
          忽略
        </Button>
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            src={item.contactAvatar}
            style={{ cursor: 'pointer' }}
            onClick={(): void => handleAvatarClick(item.contactId)}
          >
            {item.contactName?.slice(0, 1)}
          </Avatar>
        }
        title={
          <Space>
            <span
              style={{ cursor: 'pointer', fontWeight: 500 }}
              onClick={(): void => handleAvatarClick(item.contactId)}
            >
              {item.contactName}
            </span>
            <Tag icon={<ClockCircleOutlined />} color="default">
              {formatTime(item.remindAt)}
            </Tag>
          </Space>
        }
        description={item.content}
      />
    </List.Item>
  );

  const renderSection = (config: SectionConfig): React.ReactElement => {
    const items = getItemsByKey(config.key);
    return (
      <Card
        key={config.key}
        title={
          <Space>
            {config.icon}
            <span>{config.title}</span>
            <Tag color={config.color}>{items.length}</Tag>
          </Space>
        }
        className={`soft-card reminder-section reminder-section--${config.key}`}
      >
        {items.length === 0 ? (
          <Empty description="暂无提醒" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={renderReminderItem}
            split
          />
        )}
      </Card>
    );
  };

  return (
    <div className="stack reminder-center">
      <div className="reminder-center__header">
        <Space size="middle">
          <Badge count={overdueCount} offset={[6, 0]}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              <BellOutlined /> 提醒中心
            </Typography.Title>
          </Badge>
        </Space>
        <Typography.Text type="secondary">
          共 {totalCount} 条待处理提醒
          {overdueCount > 0 && <Typography.Text type="danger">（{overdueCount} 条已逾期）</Typography.Text>}
        </Typography.Text>
      </div>
      {SECTIONS.map(renderSection)}
    </div>
  );
}
