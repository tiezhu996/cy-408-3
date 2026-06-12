import { Referral } from '../../../../shared/types/entities';
import { ReferralStatus } from '../../../../shared/types/enums';
import { ReferralCard } from './ReferralCard';

export function KanbanBoard({ referrals }: { referrals: Referral[] }) {
  return (
    <div className="kanban">
      {Object.values(ReferralStatus).map((status) => (
        <section className="kanban-column" key={status}>
          <h3>{status}</h3>
          {referrals.filter((item) => item.status === status).map((item) => <ReferralCard referral={item} key={item.id} />)}
        </section>
      ))}
    </div>
  );
}
