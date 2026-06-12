import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Contact, GraphNode } from '../../../../shared/types/entities';

export function ForceGraph({ contacts, nodes }: { contacts: Contact[]; nodes: GraphNode[] }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();
    const width = 760;
    const height = 420;
    const graphNodes = contacts.map((contact) => ({ id: contact.id, name: contact.name, strength: nodes.find((node) => node.contactId === contact.id)?.strength || 2 }));
    const links = nodes.flatMap((node) => node.relatedContactIds.map((target) => ({ source: node.contactId, target })));
    const simulation = d3.forceSimulation(graphNodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-220))
      .force('center', d3.forceCenter(width / 2, height / 2));
    const link = svg.append('g').selectAll('line').data(links).enter().append('line').attr('stroke', '#cbd5e1');
    const node = svg.append('g').selectAll('circle').data(graphNodes).enter().append('circle').attr('r', (d) => 8 + d.strength * 3).attr('fill', '#2563eb');
    const label = svg.append('g').selectAll('text').data(graphNodes).enter().append('text').text((d) => d.name).attr('font-size', 12);
    simulation.on('tick', () => {
      link.attr('x1', (d: any) => d.source.x).attr('y1', (d: any) => d.source.y).attr('x2', (d: any) => d.target.x).attr('y2', (d: any) => d.target.y);
      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
      label.attr('x', (d: any) => d.x + 12).attr('y', (d: any) => d.y + 4);
    });
    return () => simulation.stop();
  }, [contacts, nodes]);

  return <svg ref={ref} viewBox="0 0 760 420" className="graph" />;
}
