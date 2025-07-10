import { createGlobalStyle } from 'styled-components';
import { theme } from './Options/styles';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: ${theme.backgroundColor};
    color: ${theme.textColor};
    line-height: 1.5;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }

  ::selection {
    background-color: ${theme.primaryColor}40;
    color: ${theme.textColor};
  }
`; 