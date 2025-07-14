import { createGlobalStyle } from 'styled-components';
import { theme } from '../components/shared/styles';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    background-color: ${theme.backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  /* Popup-specific styles */
  body[data-context="popup"] {
    width: 400px;
    min-height: 300px;
    background-color: ${theme.backgroundColor};

    #root {
      width: 100%;
      min-height: 300px;
      display: flex;
      flex-direction: column;
      background-color: ${theme.backgroundColor};
    }
  }

  /* Options page styles */
  body[data-context="options"] {
    #root {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  a {
    color: ${theme.primaryColor};
    text-decoration: none;
  }
`; 