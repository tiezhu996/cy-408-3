import { Contact } from '../../shared/types/entities';
import { RelationType } from '../../shared/types/enums';
import { getDatabase } from '../database';

const seed: Contact[] = [
  {
    id: 'contact-1',
    name: '林然',
    company: '云启科技',
    position: '前端负责人',
    email: 'linran@example.com',
    phone: '13800000001',
    wechat: 'linran_ref',
    relationType: RelationType.ExColleague,
    tags: ['React', 'SaaS'],
    notes: '前同事，熟悉招聘流程',
    lastContactAt: '2026-06-01'
  }
];

export class ContactRepository {
  list(): Contact[] {
    const db = getDatabase();
    const count = db.prepare('SELECT COUNT(*) AS total FROM contacts').get() as { total: number };
    if (count.total === 0) seed.forEach((item) => this.save(item));
    return db.prepare('SELECT * FROM contacts ORDER BY lastContactAt DESC').all().map(this.fromRow);
  }

  save(contact: Contact): Contact {
    getDatabase()
      .prepare(`INSERT OR REPLACE INTO contacts VALUES (@id,@name,@company,@position,@email,@phone,@wechat,@relationType,@tags,@avatar,@notes,@lastContactAt)`)
      .run({ ...contact, tags: JSON.stringify(contact.tags), avatar: contact.avatar ?? '' });
    return contact;
  }

  private fromRow(row: any): Contact {
    return { ...row, tags: JSON.parse(row.tags || '[]') };
  }
}
