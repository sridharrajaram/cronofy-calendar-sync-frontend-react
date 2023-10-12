import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = "http://localhost:5001"

function PrivateTopbar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await axios.get(`${backendUrl}/logout`)
        .then(res => {
            navigate('/')
            window.location.reload(true);
        })
        .catch (err => {
          console.log(err);
        })
      }
    return (
        <nav className="navbar" style={{ backgroundColor: "#E0F2F6" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">CalSync</Link>
                <div className="d-flex">
                    <button type="button" className="btn btn-outline-dark me-2" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav >
    )
}

export default PrivateTopbar