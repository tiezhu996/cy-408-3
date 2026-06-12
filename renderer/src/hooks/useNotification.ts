import { App } from 'antd';

export function useNotification() {
  const { notification } = App.useApp();
  return {
    success: (message: string) => notification.success({ message }),
    warning: (message: string) => notification.warning({ message })
  };
}
