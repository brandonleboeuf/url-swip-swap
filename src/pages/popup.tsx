import React from 'react';
import { createRoot } from 'react-dom/client';
import { Popup } from '@/components/Popup/Popup';
import { GlobalStyle } from '@/styles/global';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <Popup />
    </React.StrictMode>
  );
} 