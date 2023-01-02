import React from "react";
import styled from "styled-components";

const ErrorModal = ({ err, setError }) => {
  return (
    <>
      {err ? (
        <Container>
          <ErrorMsg>
            <div className="error-header">
              <h1>⚠️ERROR⚠️</h1>
            </div>
            <div className="error-msg">{err}</div>
          </ErrorMsg>
          <button className="error-modal-btn" onClick={() => setError('')}>Got it</button>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

const Container = styled.div`
filter: blur(0px); 
  position: absolute;
  z-index: 100;
  top: 40%;
  left: 35%;
  border: 1px dashed red;
  width: 30rem;
  background: #fff;

  display: flex;
  flex-direction: column;

  .error-modal-btn {
    background: #218838;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    cursor: pointer;
    font-family: "JetBrainsMono", monospace;
    font-size: 1rem;
    color: #fff;

    &:hover {
      box-shadow: none;
      transform: scale(1.02);
    }
  }
`;

const ErrorMsg = styled.div`
  height: 10rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  color: red;
  font-size: 0.8rem;
  margin: 1 0;
  text-align: center;
  border: 1px dashed red;
  background: #fff;

  .error-header {
    height: 3rem;
    width: 100%;
    background-color: #fff5ac;
    color: #000;
  }

  .error-msg {
    height: 7rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .error-modal-btn {
    background: #71f171;
    &:hover {
      box-shadow: none;
      transform: scale(1.1);
    }
  }
`;

export default ErrorModal;
