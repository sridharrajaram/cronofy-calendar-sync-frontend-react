import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { LoginValidation } from "../helpers/Validation";
import axios from 'axios';

const backendUrl = "http://localhost:5001"

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const navigate =useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = LoginValidation(values);
    setError(err);
    if(err.email === "" && err.password === "") {
      await axios.post(`${backendUrl}/login`,values)
      .then(res => {
        if(res.data==="Success"){
          navigate('/home');
        } else {
          alert("No records found")
        }
      })
      .catch(err => console.log(err.data))
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="p-3 rounded w-25"
            style={{ backgroundColor: "#E0F2F6" }}
          >
            <h2>Login</h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control rounded-0"
                  onChange={handleInput}
                  name="email"
                />
                {error.email && (
                  <span className="text-danger">{error.email}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-control rounded-0"
                  onChange={handleInput}
                  name="password"
                />
                {error.password && (
                  <span className="text-danger">{error.password}</span>
                )}
              </div>
              <button type="submit" className="btn btn-success w-100 rounded-0">
                Sign in
              </button>
              <p>Don't have an account</p>
              <Link
                className="btn btn-default border w-100 rounded-0"
                style={{ backgroundColor: "#E0F2F6" }}
                to="/register"
              >
                Register Account
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
