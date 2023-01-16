import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fade } from "../animations";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setAuth, userData } from "../reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setWholeState } from "../reducers/blogSlice";
import axios from "axios";

import logo from "../assets/logo.png";

const handleLogout = (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("data");
  dispatch(setAuth(false));
  dispatch(userData({}));
};

const Navbar = ({ Auth, dispatch, Email, setNavFilterLoading }) => {
  const location = useLocation();
  let path = location.pathname;

  let email = Auth ? Email.split("@")[0] : "";
  email = email.charAt(0).toLowerCase() + email.slice(1);
  
  const blogsCopy = JSON.stringify(useSelector((state) => state.blog));
  const allBlogs = useSelector((state) => state.blog);
  const myBlogs = useSelector((state) => state.user.blogs);
  const [filter, setFilter] = useState("");
  const originalState = useMemo(() => JSON.parse(blogsCopy), []);
  
  useEffect(() => {
    setNavFilterLoading(true);
    let filteredBlogs = [];
    const keys = Object.keys(allBlogs);
    if (filter.startsWith("nat")) {
      // reset the state to the original state
      dispatch(setWholeState(originalState));
      console.log("original state", originalState);
      filteredBlogs = keys.filter(key => allBlogs[key].tags.some(tag => tag.startsWith("nat"))).map((key, index) => ({index, ...allBlogs[key]})
      );
    } else if (filter.startsWith("tech")) {
      filteredBlogs = keys.filter(key => allBlogs[key].tags.some(tag => tag.startsWith("tech"))).map((key, index) => ({index, ...allBlogs[key]})
      );
    } else if (filter.startsWith("edu")) {
      filteredBlogs = keys.filter(key => allBlogs[key].tags.some(tag => tag.startsWith("edu"))).map((key, index) => ({index, ...allBlogs[key]})
      );
    } else {
      filteredBlogs = keys.map((key, index) => ({index, ...allBlogs[key]})
      );
    }
    dispatch(setWholeState(filteredBlogs));
    setNavFilterLoading(false);
  }, [filter]);

  return (
    <Nav>
      <Link to="/" className="logo-container">
        <img src={logo} alt="" className="logo" />
        <p className="blog-name">Blogs-Nd-All</p>
      </Link>
      <div className={`filter-buttons ${path === '/' ? 'hidden' : '' }`}>
        <button className="filter-btn" onClick={() => setFilter("nature")}>Nature</button>
        <button className="filter-btn" onClick={() => setFilter("tech")}>Tech</button>
        <button className="filter-btn" onClick={() => setFilter("education")}>Education</button>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={`nav-link ${path === "/" ? "active" : ""}`}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="blogs"
            className={`nav-link ${path === "/blogs" ? "active" : ""}`}
          >
            All Blogs
          </Link>
        </li>
        <li>
          <Link
            to="my-blogs"
            className={`nav-link ${path === "/my-blogs" ? "active" : ""}`}
          >
            My Blogs
          </Link>
        </li>
      </ul>
      <div className="right-side">
        <div className="email">{Auth && <p>{email}</p>}</div>
        <div className="login-signup-btns">
          {Auth ? (
            <button
              className="signup-btn"
              onClick={() => handleLogout(dispatch)}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/signup" className="signup-btn">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  background: linear-gradient(
    to right bottom,
    rgb(40, 49, 59, 0.9),
    rgb(72, 84, 97, 0.7)
  );
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .hidden {
    display: none;
  }

  .filter-buttons {
    position: absolute;
    left: 35%;

    // make a border between filter buttons and the ul element to the right

    ::after {
      content: "";
      position: absolute;
      top: 0;
      right: -1rem;
      height: 100%;
      width: 1px;
      background: #fff;
    }

    .filter-btn {
      background: transparent;
      border: none;
      color: #fff;
      font-family: "Chivo Mono", monospace;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.25s ease-in;
      &:hover {
        color: #23d997;
      }
      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }

  .logo-container {
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #fff;
    .logo {
      width: 3.125rem;
      height: 3.125rem;
    }
  }

  .right-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 1rem;

    .email {
      margin-right: 1rem;
      color: #fff;
    }
  }

  .login-btn {
    font-family: "Inter", sans-serif;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border: none;
    background: transparent;
    transition: all 0.25s ease-in;
    color: #fff;
    text-decoration: none;
    border-radius: 0.2rem;
  }
  .signup-btn {
    font-family: "Inter", sans-serif;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border: 3px solid #23d997;
    background: transparent;
    transition: all 0.25s ease-in;
    &:hover {
      background-color: #23d997;
      transform: translateY(-3.5px);
    }
    color: white;
    text-decoration: none;
    border-radius: 0.2rem;
  }

  ul {
    margin-left: 15vh;
    display: flex;
    list-style: none;

    li {
      padding: 1rem 0.5rem;
      .nav-link {
        text-decoration: none;
        color: #fff;
        font-family: "Chivo Mono", monospace;
        font-size: medium;
      }
      .active {
        border-bottom: 2px solid #23d997;
        padding-bottom: 0.5rem;
      }
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export default Navbar;
