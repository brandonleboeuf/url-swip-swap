import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${theme.colors.text};
`;

export const SwappingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: ${theme.colors.background};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${theme.colors.text};
  gap: 2rem;
`;

export const Logo = styled.div`
  width: 48px;
  height: 48px;
  background: url('assets/favicon.png') no-repeat center;
  background-size: contain;
  margin: 0 auto 16px;

  ${SwappingContainer} & {
    width: 64px;
    height: 64px;
    margin: 0;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin: 0 0 16px;
  color: ${theme.colors.primary};
  font-size: 18px;
  font-weight: 600;
`;

export const SwappingText = styled.div`
  font-size: 18px;
  color: ${theme.colors.primary};
  text-align: center;
  font-weight: 500;
`;

export const Message = styled.div`
  margin: 16px 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border-left: 4px solid ${theme.colors.primary};
  text-align: left;
  color: ${theme.colors.text};
  width: 100%;
`;

export const Instructions = styled.div`
  margin: 16px 0;
  width: 100%;
  
  h3 {
    margin: 0 0 8px;
    color: ${theme.colors.primary};
    font-size: 14px;
    font-weight: 600;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    color: ${theme.colors.text};
    font-size: 13px;
    line-height: 1.4;
    
    li {
      margin-bottom: 4px;
    }
  }
`;

export const OptionsButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: auto;
  
  &:hover {
    filter: brightness(110%);
  }

  &:active {
    filter: brightness(90%);
  }
`; 