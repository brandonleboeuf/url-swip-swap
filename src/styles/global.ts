import { createGlobalStyle } from 'styled-components';
import { theme } from '../components/Options/styles';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
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

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    color: ${theme.primaryColor};
    text-decoration: none;
  }
`; 