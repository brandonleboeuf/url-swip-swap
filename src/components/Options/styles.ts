import styled, { css, keyframes } from 'styled-components';

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

const fadeIn = keyframes`
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    max-height: 300px;
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
    max-height: 300px;
  }
  to {
    opacity: 0;
    transform: translateX(-10px);
    max-height: 0;
    margin: 0;
    padding: 0;
  }
`;

export const Container = styled.div`
  max-width: 100%;
  width: 500px;
  margin: 0 auto;
  padding: 32px;
  background-color: ${theme.tertiaryColor};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: ${theme.textColor};
`;

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

export const UrlPairsContainer = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${theme.textColor};
  font-size: 14px;
  opacity: 0.9;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.inputBackground};
  color: ${theme.textColor};
  font-size: 14px;

  &::placeholder {
    color: ${theme.placeholderColor};
  }

  &:focus {
    outline: 1px solid ${theme.primaryColor};
    outline-offset: 0;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  ${Input} {
    flex: 1;
    margin-bottom: 0;
  }
`;

export const CopyButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${theme.labelColor};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: ${theme.primaryColor};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    
    &:hover {
      color: ${theme.labelColor};
    }
  }

  svg {
    width: 16px;
    height: 16px;
  }

  ${InputWrapper} & {
    margin-left: 4px;
  }
`;

export const OpenInNewTabButton = styled(CopyButton)`
  padding-left: 4px;
`;

export const Button = styled.button`
  padding: 12px 24px;
  background-color: ${theme.primaryColor};
  color: ${theme.backgroundColor};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  display: block;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #f4b350;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const UrlPairWrapper = styled.div<{ isRemoving?: boolean }>`
  position: relative;
  opacity: 1;
  max-height: 300px;
  transition: all 0.2s ease;
  overflow: hidden;
  padding: 24px;
  margin-bottom: 16px;
  background: transparent;
  border-radius: 0;
  border-bottom: 1px solid rgba(236, 240, 241, 0.1);
  transform: translateX(0);

  &:last-child {
    margin-bottom: 24px;
  }

  &.adding {
    animation: ${fadeIn} 0.3s ease;
  }

  ${props => props.isRemoving && css`
    animation: ${slideOut} 0.15s ease-out forwards;
    pointer-events: none;
  `}
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.textColor};
    text-transform: uppercase;
  }
`;

export const CheckboxWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  order: -1;

  input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    position: absolute;
  }

  label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.backgroundColor};
    border-radius: 24px;
    transition: all 0.3s ease;
    outline: none;

    &:before {
      content: '';
      position: absolute;
      left: 2px;
      top: 2px;
      width: 20px;
      height: 20px;
      background-color: ${theme.textColor};
      border-radius: 50%;
      transition: transform 0.3s ease;
    }
  }

  input[type="checkbox"]:checked + label {
    background-color: ${theme.primaryColor};

    &:before {
      transform: translateX(20px);
    }
  }

  input[type="checkbox"]:disabled + label {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:before {
      background-color: ${theme.textColor};
      opacity: 0.5;
    }
  }

  input[type="checkbox"]:disabled:checked + label {
    background-color: ${theme.backgroundColor};
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background-color: transparent;
  color: ${theme.textColor};
  border: 1px solid rgba(236, 240, 241, 0.2);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  transition: all 0.2s ease;
  cursor: pointer;

  ${UrlPairWrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: #e74c3c;
    border-color: #e74c3c;
  }

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const AddPairButton = styled(Button)`
  margin-top: 16px;
`;

export const ImportExportContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

export const ImportExportButton = styled(Button)`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${theme.primaryColor};
  color: ${theme.primaryColor};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background-color: ${theme.primaryColor};
    color: ${theme.backgroundColor};
  }

  /* Ensure label behaves like a button */
  &[for="import-config"] {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface FooterProps {
  version: string;
}

export const Footer = styled.div<FooterProps>`
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: ${theme.labelColor};
  
  div {
    margin: 2px 0;
  }

  a {
    color: ${theme.primaryColor};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`; 