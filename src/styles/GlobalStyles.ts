import { createGlobalStyle } from "styled-components";



const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    color: #212521;
    a {
      text-decoration: none;
      color: inherit;
    }
    
    .offscreen {
    position: absolute;
    left: -9999px;
    top: 0;
  }
  }

  
`;

export default GlobalStyles;
