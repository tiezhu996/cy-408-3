import { useEffect } from 'react';
import { Card } from 'antd';
import { ForceGraph } from '../components/common/ForceGraph';
import { NodeDetail } from '../components/common/NodeDetail';
import { useContactStore } from '../stores/contact';
import { useGraphStore } from '../stores/graph';

export function Graph() {
  const contacts = useContactStore((state) => state.contacts);
  const loadContacts = useContactStore((state) => state.load);
  const { nodes, load: loadGraph } = useGraphStore();
  useEffect(() => { void loadContacts(); void loadGraph(); }, [loadContacts, loadGraph]);
  return <div className="stack"><Card title="人脉关系图谱"><ForceGraph contacts={contacts} nodes={nodes} /></Card><NodeDetail /></div>;
}
