import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fade } from "../animations";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setAuth, userData } from "../reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setWholeState } from "../reducers/blogSlice";

import logo from "../assets/logo.png";

const handleLogout = (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  dispatch(setAuth(false));
  dispatch(userData({}));
};

const Navbar = ({
  Auth,
  dispatch,
  Email,
  setNavFilterLoading,
  setFBlogs,
  setMFBlogs,
  setErrorFiltering,
}) => {
  const location = useLocation();
  let path = location.pathname;


  let email = Auth ? JSON.parse(localStorage.getItem("email")).split("@")[0] : "";
  email = email.charAt(0).toLowerCase() + email.slice(1);

  const allBlogs = useSelector((state) => state.blog);
  const myBlogs = useSelector((state) => state.user.blogs);
  const blog = path === "/blogs" ? allBlogs : myBlogs;
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setNavFilterLoading(true);
    let filteredBlogs;
    const keys =
      path === "/blogs" ? Object.keys(allBlogs) : Object.keys(myBlogs);
    if (filter.startsWith("nat")) {
      filteredBlogs = keys
        .filter((key) => blog[key].tags.some((tag) => tag.startsWith("nat")))
        .map((key, index) => ({ index, ...blog[key] }));
      // check if filtered blogs is empty, set error message if it is empty
      if (filteredBlogs.length === 0 || filteredBlogs === undefined) {
        setErrorFiltering({
          status: true,
          message: "0 Blogs Found",
        });
        return;
      } else {
        setErrorFiltering({
          status: false,
          message: "",
        });
      }
      if (path === "/blogs") {
        setFBlogs(filteredBlogs);
      } else if (path === "/my-blogs") {
        setMFBlogs(filteredBlogs);
      }
    }
    if (filter.startsWith("tech")) {
      filteredBlogs = keys
        .filter((key) => blog[key].tags.some((tag) => tag.startsWith("tech")))
        .map((key, index) => ({ index, ...blog[key] }));
      // check the route and set the blogs accordingly
      if (filteredBlogs.length === 0 || filteredBlogs === undefined) {
        setErrorFiltering({
          status: true,
          message: "0 Blogs Found",
        });
        return;
      } else {
        setErrorFiltering({
          status: false,
          message: "",
        });
      }
      if (path === "/blogs") {
        setFBlogs(filteredBlogs);
      } else if (path === "/my-blogs") {
        setMFBlogs(filteredBlogs);
      }
    }
    if (filter.startsWith("edu")) {
      filteredBlogs = keys
        .filter((key) => blog[key].tags.some((tag) => tag.startsWith("edu")))
        .map((key, index) => ({ index, ...blog[key] }));

      // check if filtered blogs isnt empty
      if (filteredBlogs.length === 0 || filteredBlogs === undefined) {
        // set error message
        setErrorFiltering({
          status: true,
          message: "0 Blogs Found",
        });
        return;
      } else {
        setErrorFiltering({
          status: false,
          message: "",
        });
      }
      if (path === "/blogs") {
        setFBlogs(filteredBlogs);
      } else if (path === "/my-blogs") {
        setMFBlogs(filteredBlogs);
      }
    }

    // if user clicks on clear button
    if (filter === "") {
      if (path === "/blogs") {
        setFBlogs(allBlogs);
      } else if (path === "/my-blogs") {
        setMFBlogs(myBlogs);
      }
    }

    setNavFilterLoading(false);
  }, [filter]);

  // create search handler for search bar
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());

    let filteredBlogs;
    const keys =
      path === "/blogs" ? Object.keys(allBlogs) : Object.keys(myBlogs);
      // filter blogs by title or description
      filteredBlogs = keys
      .filter((key) => blog[key].title.toLowerCase().includes(search))
      .map((key, index) => ({ index, ...blog[key] }));
    
    // check if filtered blogs isnt empty
    if (filteredBlogs.length === 0 || filteredBlogs === undefined) {
      // set error message
      setErrorFiltering({
        status: true,
        message: "0 Blogs Found",
      });

      return;
    } else {
      setErrorFiltering({
        status: false,
        message: "",
      });
    }
    if (path === "/blogs") {
      setFBlogs(filteredBlogs);
    } else if (path === "/my-blogs") {
      setMFBlogs(filteredBlogs);
    }
  };

  useEffect(() => {
    if (search === "") {
      if (path === "/blogs") {
        setFBlogs(allBlogs);
      } else if (path === "/my-blogs") {
        setMFBlogs(myBlogs);
      }
    }
  }, [search]);

  return (
    <Nav>
      <Link to="/" className="logo-container">
        <img src={logo} alt="" className="logo" />
        <p className="blog-name">caskadeblogz</p>
      </Link>
      <div
        className={`filter-buttons ${
          path === "/" || path === "/editor" ? "hidden" : ""
        }`}
      >
        <button className="filter-btn" onClick={() => setFilter("nature")}>
          Nature
        </button>
        <button className="filter-btn" onClick={() => setFilter("tech")}>
          Tech
        </button>
        <button className="filter-btn" onClick={() => setFilter("education")}>
          Education
        </button>
        <button className="filter-btn clear-btn" onClick={() => setFilter("")}>
          Clear
        </button>
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
        <li>
          <Link
            to="editor"
            className={`nav-link create-btn ${
              path === "/editor" ? "active" : ""
            }`}
          >
            Create+
          </Link>
        </li>
        <li
          className={`nav-link ${
            path === "/blogs" || path === "/my-blogs" ? "active" : "hidden"
          }`}
        >
          <input
            type="text"
            placeholder="search..."
            className="search-input"
            onChange={(e) => {
              handleSearch(e);
            }}
          />
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

  .filter-buttons {
    display: block;
    position: absolute;
    left: 27%;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: -1rem;
      height: 100%;
      width: 1px;
      background: #929292;
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
        color: #ff7676;
      }
      &:not(:last-child) {
        margin-right: 1rem;
      }

      &.clear-btn {
        color: #ff7676;
      }
    }
  }
  .hidden {
    display: none;
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
    margin-left: 19rem;
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
      .search-input {
        background: transparent;
        border: none;
        border-bottom: 1px solid #fff;
        color: #fff;
        font-family: "Chivo Mono", monospace;
        font-size: medium;
        width: 15rem;
        height: 1.5rem;
        transition: all 0.5s ease-in;
        // make the border come together on focus and hover
        &:focus {
          outline: none;
          border-bottom: 1px solid #23d997;
        }
      }

      .create-btn {
        border: none;
        background: transparent;
        cursor: pointer;
        &:hover {
          color: #23d997;
        }
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
