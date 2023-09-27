import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { RegisterValidation } from "../helpers/Validation";

function RegisterPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(RegisterValidation(values));
  };
  return (
    <Layout>
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="p-3 rounded w-25"
            style={{ backgroundColor: "#E0F2F6" }}
          >
            <h2>Register</h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <strong>Name</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="form-control rounded-0"
                  onChange={handleInput}
                  name="name"
                />
                {error.name && (
                  <span className="text-danger">{error.name}</span>
                )}
              </div>
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
              <button
                type="submit"
                className="btn btn-success w-100 rounded-0"
              >
                Create Account
              </button>
              <p>If already registered with us</p>
              <Link
                className="btn btn-default border w-100 rounded-0"
                style={{ backgroundColor: "#E0F2F6" }}
                to="/login"
              >
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterPage;
