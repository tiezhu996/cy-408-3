import { Referral } from '../../shared/types/entities';
import { ReferralStatus } from '../../shared/types/enums';
import { getDatabase } from '../database';

const seed: Referral[] = [
  {
    id: 'referral-1',
    contactId: 'contact-1',
    targetCompany: '云启科技',
    targetPosition: '高级前端工程师',
    status: ReferralStatus.Interviewing,
    requestDate: '2026-06-03',
    feedback: [{ date: '2026-06-05', content: '简历已递交，等待二面安排' }]
  }
];

export class ReferralRepository {
  list(): Referral[] {
    const db = getDatabase();
    const count = db.prepare('SELECT COUNT(*) AS total FROM referrals').get() as { total: number };
    if (count.total === 0) seed.forEach((item) => this.save(item));
    return db.prepare('SELECT * FROM referrals ORDER BY requestDate DESC').all().map(this.fromRow);
  }

  save(referral: Referral): Referral {
    getDatabase()
      .prepare(`INSERT OR REPLACE INTO referrals VALUES (@id,@contactId,@targetCompany,@targetPosition,@status,@requestDate,@resumePath,@feedback)`)
      .run({ ...referral, resumePath: referral.resumePath ?? '', feedback: JSON.stringify(referral.feedback) });
    return referral;
  }

  private fromRow(row: any): Referral {
    return { ...row, feedback: JSON.parse(row.feedback || '[]') };
  }
}
