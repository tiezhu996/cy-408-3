import { App as AntApp } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './styles/global.css';

export default function App() {
  return (
    <AntApp>
      <RouterProvider router={router} />
    </AntApp>
  );
}
