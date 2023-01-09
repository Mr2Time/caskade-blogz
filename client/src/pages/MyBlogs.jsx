import React, { useEffect } from "react";
import Create from "../components/Create";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ErrorPage from "../components/ErrorPage";
import styled from "styled-components";
import { userData } from "../reducers/userSlice";
import Spinner from "../components/Spinner";
import Cards from "../components/Cards";

export default function MyBlogs() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  
  // const firstImg = firstImg.match(/<img[^>]*>/)[0];

  const uri = "http://localhost:8000/api/users/myblogs";
  
  useEffect(() => {
    setLoading(true);
    const getMyBlogs = async () => {
    const userId = localStorage.getItem("user");
      try {
        const res = user.auth && await axios.get(uri, {
          params: { id: userId },
        });
        const id = res.data.user._id;
        const {email, blogs } = res.data.user;

        dispatch(userData({id, email, blogs}))
      } catch (error) {
        setLoading(true)
      }

      setLoading(false);
    };

    getMyBlogs();
  
  }, []);


  return (
    <Container>
      {user.auth ? (
        <>
        {loading ? <Spinner /> : (
          <>
          <Cards blogs={user.blogs} auth={user.auth}/>
          {/* <Create /> */}
        </>
          )}
        </>
      ) : (
        <ErrorPage />
      )}
    </Container>
  );
}

const Container = styled.div`
   margin-top:  5rem;
`;
