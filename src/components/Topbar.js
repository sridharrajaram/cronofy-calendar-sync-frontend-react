import React from 'react'

function Topbar() {
    return (
        <nav className="navbar" style={{ backgroundColor: "#E0F2F6" }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">CalSync</a>
                <div className="d-flex">
                    <button type="button" className="btn btn-outline-dark me-2">Login</button>
                    <button type="button" className="btn btn-outline-dark">Sign-up</button>
                </div>
            </div>
        </nav >
    )
}

export default Topbar