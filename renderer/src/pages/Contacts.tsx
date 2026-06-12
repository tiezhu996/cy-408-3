import { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import { ContactCard } from '../components/common/ContactCard';
import { FilterBar } from '../components/common/FilterBar';
import { useContactStore } from '../stores/contact';

export function Contacts() {
  const { contacts, load } = useContactStore();
  const [keyword, setKeyword] = useState('');
  const [relation, setRelation] = useState('');
  useEffect(() => { void load(); }, [load]);
  const filtered = useMemo(() => contacts.filter((item) =>
    (!keyword || item.name.includes(keyword) || item.company.includes(keyword)) &&
    (!relation || item.relationType === relation)
  ), [contacts, keyword, relation]);
  return (
    <div>
      <FilterBar onSearch={setKeyword} onRelation={setRelation} />
      <Row gutter={[16, 16]}>{filtered.map((contact) => <Col span={8} key={contact.id}><ContactCard contact={contact} /></Col>)}</Row>
    </div>
  );
}
