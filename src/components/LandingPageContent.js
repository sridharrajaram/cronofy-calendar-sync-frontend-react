import React from 'react'
import calendarpin from '../assets/images/calendarpin.jpg';
import calendar from '../assets/images/calendar.jpg';
import laptops from '../assets/images/laptops.jpg';

function LandingPageContent() {
    return (
        <div className="container mt-2">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={calendarpin} width="1920px" height="500px" class="d-block w-100" alt="carousel-food" />
                    </div>
                    <div class="carousel-item">
                        <img src={calendar} width="1920px" height="500px" class="d-block w-100" alt="carousel-bread" />
                    </div>
                    <div class="carousel-item">
                        <img src={laptops} width="1920px" height="500px" class="d-block w-100" alt="carousel-cycle" />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        // <div className="container">
        //     <img src={cycle} alt="food1"/>
        // </div>
    )
}

export default LandingPageContent