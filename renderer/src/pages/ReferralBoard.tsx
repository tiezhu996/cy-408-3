import { useEffect } from 'react';
import { KanbanBoard } from '../components/common/KanbanBoard';
import { useReferralStore } from '../stores/referral';

export function ReferralBoard() {
  const { referrals, load } = useReferralStore();
  useEffect(() => { void load(); }, [load]);
  return <KanbanBoard referrals={referrals} />;
}
