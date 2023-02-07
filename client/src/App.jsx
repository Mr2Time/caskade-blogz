import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { pageAnimation } from "./animations";

import TipTap from "./components/TipTap";
import Nav from "./components/Navbar";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogPage from "./pages/BlogPage";

import GlobalStyle from "./components/GlobalStyles";

function App() {
  const { pathname, key } = useLocation();

  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [navFilterLoading, setNavFilterLoading] = useState(false);

  const [FBlogs, setFBlogs] = useState("");
  const [MFBlogs, setMFBlogs] = useState("");
  const [errorFiltering, setErrorFiltering] = useState({
    status: false,
    message: "",
  });

  return (
    <>
      <GlobalStyle />
      <Nav
        Auth={User.auth}
        dispatch={dispatch}
        Email={User.email}
        setNavFilterLoading={setNavFilterLoading}
        setFBlogs={setFBlogs}
        setMFBlogs={setMFBlogs}
        setErrorFiltering={setErrorFiltering}
      />
      <AnimatePresence mode="wait">
      <Routes location={pathname} key={key}>
        <Route path="/">
          <Route index element={<Home />} />
          <Route
            path="blogs"
            element={
              <Blogs
              navFilterLoading={navFilterLoading}
              FBlogs={FBlogs}
                setFBlogs={setFBlogs}
                errorFiltering={errorFiltering}
                />
              }
              />
          <Route
            path="my-blogs"
            element={
              <MyBlogs
              navFilterLoading={navFilterLoading}
              MFBlogs={MFBlogs}
              setMFBlogs={setMFBlogs}
              errorFiltering={errorFiltering}
              />
            }
            />
          <Route path="editor" element={<TipTap />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          // page when post is clicked on whether its allblogs or myblogs
          <Route path="blog/:id" element={<BlogPage />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
