import React, { useEffect } from "react";
import Create from "../components/Create";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ErrorPage from "../components/ErrorPage";
import styled from "styled-components";
import { userData } from "../reducers/userSlice";
import MBlogs from "../components/MBlogs";

export default function MyBlogs() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  
  // const firstImg = firstImg.match(/<img[^>]*>/)[0];

  const uri = "http://localhost:8000/api/users/myblogs";
  
  useEffect(() => {
    const getMyBlogs = async () => {
    const userId = localStorage.getItem("user");
      try {
        const res = user.auth && await axios.get(uri, {
          params: { id: userId },
        });
        const id = res.data.user._id;
        const {email, blogs } = res.data.user;

        dispatch(userData({id, email, blogs}))
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMyBlogs();
  
  }, []);


  return (
    <Container>
      {user.auth ? (
        <div>
          User's blogs here, show cards
          <MBlogs blogs={user.blogs} auth={user.auth} />
          <Create />
        </div>
      ) : (
        <ErrorPage />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
