import React from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';  // 添加这行
import App from './components/App';
import '@arco-design/web-react/dist/css/arco.css';
import './styles/global.css';  // 添加这一行

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);