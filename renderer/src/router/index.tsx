import { Layout, Menu, Typography } from 'antd';
import { createHashRouter, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Contacts } from '../pages/Contacts';
import { ContactDetail } from '../pages/ContactDetail';
import { Dashboard } from '../pages/Dashboard';
import { Graph } from '../pages/Graph';
import { ReferralBoard } from '../pages/ReferralBoard';

function AppLayout() {
  const navigate = useNavigate();
  return (
    <Layout className="app-shell">
      <Layout.Sider width={220} theme="light">
        <Typography.Title level={4} className="brand">内推关系</Typography.Title>
        <Menu
          mode="inline"
          defaultSelectedKeys={['/dashboard']}
          onClick={(item) => navigate(item.key)}
          items={[
            { key: '/dashboard', label: '仪表板' },
            { key: '/contacts', label: '联系人列表' },
            { key: '/referrals', label: '内推看板' },
            { key: '/graph', label: '人脉图谱' }
          ]}
        />
      </Layout.Sider>
      <Layout.Content className="content">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'contacts/:id', element: <ContactDetail /> },
      { path: 'referrals', element: <ReferralBoard /> },
      { path: 'graph', element: <Graph /> }
    ]
  }
]);
