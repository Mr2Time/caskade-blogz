import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        
    }

    body {
        font-family: "Arial", monospace;
        background-color: #1b1b1b;
    }

    .loader-container {
        position: absolute;
        left: 50%;
        top: 50%;
    
      .loader {
        border: 10px solid #f3f3f3;
        border-top: 10px solid #3498db;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        animation: spin 1s linear infinite;
      }
  }

  img {
    max-width: 100%;
    object-fit: cover;
    opacity: 0.9;
  }

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 

`;
export default GlobalStyle;
