import React from 'react';
import { Options } from '@/components/Options/Options';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from '@/styles/global';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <Options />
    </React.StrictMode>
  );
} 