import { create } from 'zustand';
import { GraphNode } from '../../../shared/types/entities';
import { invokeIPC } from '../api/ipc';

interface GraphState {
  nodes: GraphNode[];
  load: () => Promise<void>;
}

export const useGraphStore = create<GraphState>((set) => ({
  nodes: [],
  load: async () => set({ nodes: await invokeIPC<GraphNode[]>('graph:list') })
}));
