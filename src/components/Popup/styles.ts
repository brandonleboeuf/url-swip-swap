import styled from 'styled-components';
import { theme } from '../shared/styles';

export const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-width: 400px;
  min-height: 300px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${theme.textColor};
  background-color: ${theme.tertiaryColor};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

export const SwappingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  min-width: 400px;
  background-color: ${theme.tertiaryColor};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${theme.textColor};
  gap: 2rem;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

export const SwappingText = styled.div`
  font-size: 18px;
  color: ${theme.primaryColor};
  text-align: center;
  font-weight: 500;
`;

export const Instructions = styled.div`
  margin: 16px 0;
  width: 100%;
  
  h3 {
    margin: 0 0 8px;
    color: ${theme.primaryColor};
    font-size: 14px;
    font-weight: 600;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    color: ${theme.textColor};
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
  background-color: ${theme.primaryColor};
  color: ${theme.backgroundColor};
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;
  
  &:hover {
    background-color: #f4b350;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const CopyButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3d8b40;
  }
`; 