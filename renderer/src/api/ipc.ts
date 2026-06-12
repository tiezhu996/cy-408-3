export async function invokeIPC<T>(channel: string, payload?: unknown): Promise<T> {
  if (window.referralAPI) {
    return window.referralAPI.invoke<T>(channel, payload);
  }
  return mockInvoke(channel, payload) as T;
}

async function mockInvoke(channel: string, payload?: unknown) {
  const storeKey = `mock:${channel}`;
  if (channel.endsWith(':save')) {
    const listChannel = channel.replace(':save', ':list');
    const current = JSON.parse(localStorage.getItem(`mock:${listChannel}`) || '[]');
    const next = current.filter((item: any) => item.id !== (payload as any).id).concat(payload);
    localStorage.setItem(`mock:${listChannel}`, JSON.stringify(next));
    return payload;
  }
  const existing = localStorage.getItem(storeKey);
  if (existing) return JSON.parse(existing);
  return [];
}
