import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        
    }

    body {
        font-family: "Arial", monospace;
        background: linear-gradient(
    to right top,
    rgb(40, 49, 59, 0.9),   rgb(72, 84, 97, 0.7)
    
    );
    background-repeat: no-repeat;
    }

  img {
    max-width: 100%;
    object-fit: cover;
    opacity: 0.9;
  }

`;
export default GlobalStyle;
