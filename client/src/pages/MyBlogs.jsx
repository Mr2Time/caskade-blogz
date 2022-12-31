import React from "react";
import Create from "../components/Create";
import { useSelector } from "react-redux";
import ErrorPage from "../components/ErrorPage";
import styled from "styled-components";

export default function MyBlogs() {
  const isAuth = useSelector((state) => state.user.auth);

  return (
    <Container>
      {isAuth ? (
        <div>
          <h1>My Blogs</h1>
          <Create />
        </div>
      ) : (
        <ErrorPage />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
