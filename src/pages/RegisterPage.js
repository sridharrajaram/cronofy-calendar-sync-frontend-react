import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';

function RegisterPage() {
    return (
        <Layout>
            <div className="container mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="p-3 rounded w-25" style={{ backgroundColor: "#E0F2F6" }}>
                        <h2>Register</h2>
                        <form action="">
                            <div className="mb-3">
                                <label htmlFor='name' className="form-label"><strong>Name</strong></label>
                                <input type='text' placeholder='Enter Full Name' className='form-control rounded-0' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='email' className="form-label"><strong>Email</strong></label>
                                <input type='email' placeholder='Enter Email' className='form-control rounded-0' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='password' className="form-label"><strong>Password</strong></label>
                                <input type='password' placeholder='Enter Password' className="form-control rounded-0" />
                            </div>
                            <button className="btn btn-success w-100 rounded-0">Create Account</button>
                            <p>If already registered with us</p>
                            <Link className="btn btn-default border w-100 rounded-0" style={{ backgroundColor: "#E0F2F6" }} to='/login'>Login</Link>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RegisterPage;