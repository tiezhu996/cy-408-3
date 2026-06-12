import { useCallback } from 'react';
import { invokeIPC } from '../api/ipc';

export function useIPC<T>(channel: string) {
  return useCallback((payload?: unknown) => invokeIPC<T>(channel, payload), [channel]);
}
