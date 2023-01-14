import styled from "styled-components";
import  {Link}  from "react-router-dom";

const ErrorPage = () => {
    return (
      <NoAuth>
        <h1 className='error-code'>401 - Unathorized</h1>
        <h1>please sign-in/sign-up to view this page.</h1>
          <Link to="/login" className='sign-in-btn'>Sign-In</Link>
      </NoAuth>
    );
};

export default ErrorPage;

const NoAuth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // make height of the container 100% of the viewport
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    to right top,
    rgb(40, 49, 59, 0.9),   rgb(72, 84, 97, 0.7)

  );
  color: #fff;
  font-family: 'Courier New', monospace;

  .sign-in-btn {
    margin-top: 2rem;
    padding: 0.5rem 0.5rem;
    text-decoration: none;
    border-bottom: 2px solid #23d997;
    color: #fff;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: translateY(-3px);
    }
  }
`;
