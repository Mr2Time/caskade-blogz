import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { Routes, Route, useLocation } from "react-router-dom";

import TipTap from './components/TipTap';
import Nav from './components/Navbar'
import Home from './pages/Home';
import MyBlogs from './pages/MyBlogs';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Signup from './pages/Signup';

import GlobalStyle from './components/GlobalStyles';


function App() {
  const {pathname, key} = useLocation();


  return (
    <div className="App">
      <GlobalStyle />
      <Nav />
      <Routes location={pathname} key={key}>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="my-blogs" element={<MyBlogs />} />
            <Route path="editor" element={<TipTap />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;