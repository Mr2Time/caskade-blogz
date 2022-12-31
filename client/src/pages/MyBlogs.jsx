import React, { useState, useEffect } from "react";
import Create from "../components/Create";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../reducers/userSlice";
import styled from "styled-components";

const Restrict = () => {
  return (
    <NoAuth>
      <h1 className='error-code'>401</h1>
      <h1>Please sign-in to view this page.</h1>
        <Link to="/login" className='sign-in-btn'>Sign-In</Link>
    </NoAuth>
  );
};

export default function MyBlogs() {
  const isAuth = useSelector((state) => state.user.auth);

  const dispatch = useDispatch();

  return (
    <Container>
      {isAuth ? (
        <div>
          <h1>My Blogs</h1>
          <Create />
        </div>
      ) : (
        <Restrict />
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

const NoAuth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 93vh;
  width: 100vw;
  background: #282828;
`;
