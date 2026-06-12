import { Input, Select, Space } from 'antd';
import { RelationType } from '../../../../shared/types/enums';

export function FilterBar({ onSearch, onRelation }: { onSearch: (value: string) => void; onRelation: (value: string) => void }) {
  return (
    <Space className="filter-bar">
      <Input.Search placeholder="搜索姓名 / 公司" allowClear onSearch={onSearch} />
      <Select
        placeholder="关系类型"
        allowClear
        style={{ width: 180 }}
        onChange={(value) => onRelation(value || '')}
        options={Object.values(RelationType).map((value) => ({ value, label: value }))}
      />
    </Space>
  );
}
