import { create } from 'zustand';
import { Referral } from '../../../shared/types/entities';
import { invokeIPC } from '../api/ipc';

interface ReferralState {
  referrals: Referral[];
  load: () => Promise<void>;
  save: (referral: Referral) => Promise<void>;
}

export const useReferralStore = create<ReferralState>((set) => ({
  referrals: [],
  load: async () => set({ referrals: await invokeIPC<Referral[]>('referrals:list') }),
  save: async (referral) => {
    await invokeIPC<Referral>('referrals:save', referral);
    set((state) => ({ referrals: state.referrals.filter((item) => item.id !== referral.id).concat(referral) }));
  }
}));
