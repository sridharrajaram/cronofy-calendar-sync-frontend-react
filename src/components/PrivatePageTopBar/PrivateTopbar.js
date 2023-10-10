import React from 'react';
import { Link } from 'react-router-dom';

function PrivateTopbar() {
    return (
        <nav className="navbar" style={{ backgroundColor: "#E0F2F6" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">CalSync</Link>
                <div className="d-flex">
                    <Link type="button" className="btn btn-outline-dark me-2" to="/">Logout</Link>
                </div>
            </div>
        </nav >
    )
}

export default PrivateTopbar