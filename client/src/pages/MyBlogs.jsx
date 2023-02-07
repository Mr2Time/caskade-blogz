import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ErrorPage from "../components/ErrorPage";
import styled from "styled-components";
import { userData } from "../reducers/userSlice";
import Spinner from "../components/Spinner";
import Cards from "../components/Cards";
import NoBlogs from "./NoBlogs";
import { pageAnimation } from "../animations";
import { motion } from "framer-motion";

export default function MyBlogs({ MFBlogs, setMFBlogs, errorFiltering }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const uri = "http://localhost:8000/api/users/myblogs";
  const blogs = MFBlogs ? MFBlogs : user.blogs;

  useEffect(() => {
    setLoading(true);
    const getMyBlogs = async () => {
      const userId = localStorage.getItem("user");
      try {
        const res =
          user.auth &&
          (await axios.get(uri, {
            params: { id: userId },
          }));
        const id = res.data.user._id;
        const { email, blogs } = res.data.user;
        dispatch(userData({ id, email, blogs }));
      } catch (error) {
        setLoading(true);
      }

      setLoading(false);
    };

    getMyBlogs();
  }, []);

  useEffect(() => {
    if (user.auth) {
      setMFBlogs(user.blogs);
    }
  }, [user]);

  return (
    <motion.div
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div>
        {user.auth ? (
          <>
            {loading ? (
              <Spinner />
            ) : (
              <>
                {errorFiltering.status ? (
                  <NoBlogs />
                ) : (
                  <Cards blogs={blogs} auth={user.auth} />
                )}
              </>
            )}
          </>
        ) : (
          <ErrorPage />
        )}
      </div>
    </motion.div>
  );
}
