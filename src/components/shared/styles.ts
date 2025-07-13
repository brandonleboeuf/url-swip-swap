import styled from 'styled-components';

export const theme = {
  primaryColor: '#f39c12',
  secondaryColor: '#2c3e50',
  backgroundColor: '#1d1d1de6',
  tertiaryColor: '#34495e',
  textColor: '#ecf0f1',
  labelColor: '#bdc3c7',
  inputBackground: '#2c3e50',
  borderColor: '#34495e',
  placeholderColor: '#95a5a6'
};

export const Title = styled.h1`
  color: ${theme.primaryColor};
  text-align: center;
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 600;
  text-transform: none;
`;

export const Tagline = styled.div`
  color: ${theme.primaryColor};
  text-align: center;
  margin: 0 0 24px;
  font-size: 14px;
  font-style: italic;
  opacity: 0.9;
`;

export const Description = styled.div`
  color: ${theme.textColor};
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.5;
  font-size: 14px;
  opacity: 0.9;
`;

export const Message = styled.div`
  margin: 16px 0;
  padding: 12px;
  background-color: ${theme.secondaryColor};
  border-radius: 6px;
  border-left: 4px solid ${theme.primaryColor};
  text-align: left;
  color: ${theme.textColor};
  width: 100%;
`;

export const Logo = styled.div`
  width: 48px;
  height: 48px;
  background: url('assets/favicon.png') no-repeat center;
  background-size: contain;
  margin: 0 auto 16px;
`; 