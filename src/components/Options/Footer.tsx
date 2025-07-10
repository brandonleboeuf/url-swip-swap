import React from 'react';
import { Footer as StyledFooter } from './styles';

interface FooterProps {
  version: string;
}

export const Footer: React.FC<FooterProps> = ({ version }) => {
  return (
    <StyledFooter version={version}>
      <div>Version: {version}</div>
      <div>Created by <a href="https://github.com/brandonleboeuf" target="_blank" rel="noopener noreferrer">Brandon</a></div>
      <div>Est. 2024</div>
    </StyledFooter>
  );
}; 