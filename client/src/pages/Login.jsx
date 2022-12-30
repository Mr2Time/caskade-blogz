import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import Spinner from "../components/Spinner";

import registernew from "../assets/register-new.png";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: 0,
    message: '',
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const uri = "http://localhost:8000/api/users/auth";

  const onSubmit = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      const { data } = await axios.post(uri, {
        email,
        password,
      });
      console.log(data)
      localStorage.setItem("token", data.data);
      // window.location = "/";
      setLoading(false);
    } catch (error) {
      const {status, data: {message} } = error.response;
      setError({status, message});
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  
  return (
    <>
    {loading ? <Spinner /> : (
    <Container>
      <FormContainer>
        <div className="image-section">
          <img src={registernew} alt="register-img" />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <h1>Member Login</h1>
          <input
            id="email"
            name="email"
            placeholder="Email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            />
          <input
            id="password"
            name="password"
            placeholder="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button type="submit">Login</button>
          <div>
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
          {error.message && <div className={`form-control ${error.status == 200 ? 'smsg' : ''}`} style={{margin: '2rem 0', fontFamily: 'Arial' }}>{error.message}</div>}

        </form>
      </FormContainer>
    </Container>
    )}
  </>
  );
}

const FormContainer = styled.div`
  width: 50%;
  height: 70%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #fff;
  border-radius: 0.5rem;

  Form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 1.5rem;
      font-weight: 500;
      font-family: Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      margin-bottom: 2.5rem;
      text-align: center;
    }

    input {
      width: 100%;
      height: 2rem;
      margin-bottom: 0.5rem;
      padding: 0.5rem 0.8rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      outline: none;
      background: #f5f5f5;
    }

    button {
      width: 100%;
      height: 2rem;
      margin-bottom: 1rem;
      background: #6FB554;
      border: none;
      border-radius: 0.5rem;
      color: white;
      cursor: pointer;
    }

    .form-control {
      color: red;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .smsg {
      color: green;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to right top,
    rgba(73, 89, 199, 0.9),
    rgba(185, 90, 186, 0.7)
  );
`;
