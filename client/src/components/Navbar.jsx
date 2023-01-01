import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fade } from "../animations";
import { Link } from "react-router-dom";
import { setAuth, userData } from "../reducers/userSlice";

import logo from "../assets/logo.png";

const handleLogout = (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("data");
  dispatch(setAuth(false));
  dispatch(userData({}));
}

const Navbar = ({Auth, dispatch, Email}) => {

  let email = Auth ? Email.split('@')[0] : '';
  email = email.charAt(0).toUpperCase() + email.slice(1);

  return (
    <Nav>
      <Link to="/" className="logo-container">
        <img src={logo} alt="" className="logo" />
        <p className="blog-name">Blogs-Nd-All</p>
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="blogs" className="nav-link">
            All Blogs
          </Link>
        </li>
        <li>
          <Link to="my-blogs" className="nav-link">
            My Blogs
          </Link>
        </li>
      </ul>
      <div className='right-side'>
      <div className='email'>
        {Auth && <p>{email}</p>}
      </div>
      <div className="login-signup-btns">
      {Auth ? (
        <button className='signup-btn' onClick={() => handleLogout(dispatch)}>Logout</button>
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
    rgb(40, 49, 59, 0.9),   rgb(72, 84, 97, 0.7)
  );  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
    margin-left: 20vh;
    display: flex;
    list-style: none;

    li {
      padding: 1rem 2rem;
      .nav-link {
        text-decoration: none;
        color: #fff;
        font-family: "Chivo Mono", monospace;
        font-size: medium;
      }
    }

    @media screen and (max-width: 768px) {
      display: none;  
    }
  }
`;

export default Navbar;
