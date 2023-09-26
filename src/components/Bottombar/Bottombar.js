import React from 'react';
import '../Bottombar/Bottombar.css';

function Bottombar() {
    const currentYear = new Date().getFullYear()
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col d-flex align-items-center justify-content-between">
                    <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                        CalSync
                    </a>
                    <span className="mb-3 mb-md-0 text-body-secondary">&copy; Sridhar, {currentYear}</span>
                </div>
            </footer>
        </div>
    )
}

export default Bottombar;