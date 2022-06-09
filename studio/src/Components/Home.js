import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import React, { Component } from 'react';

import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import '../App.css';

function Home() {

    return (
        <div className="App text-center">
            <NavbarComponent />

            <div className="container mt-5 mb-5 home-image float-center">
                <Carousel fade keyboard variant="dark" prevLabel="" nextLabel="">
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-100"
                            src="https://wallpapercave.com/wp/wp1873195.jpg"
                            alt="First sli0de"
                        />
                        <Carousel.Caption>
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat,
                                enim non ultricies scelerisque, tortor dolor viverra arcu, ac ornare orci arcu vel elit</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-100"
                            src="https://wallpapercave.com/wp/wp5044952.jpg"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat,
                                enim non ultricies scelerisque, tortor dolor viverra arcu, ac ornare orci arcu vel elit</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-100"
                            src="https://wallpapercave.com/wp/wp5044955.jpg"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat,
                                enim non ultricies scelerisque, tortor dolor viverra arcu, ac ornare orci arcu vel elit</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="container mt-5" id="about">
                <h2 className="text-white h2 text-uppercase">ABOUT US</h2>
                <p className="h5 text-dark rounded p-3 ">HK Wewalage studio and photography is one of the leading studio
                    in our area since 2018.We have talented resource pool of experienced photographers, videographers and graphic
                    designers. Join with us for your weddings, parties, baby showers etc. We'll make your unforgettable day an
                    everlasting one.</p>
            </div>

            <div className="container mt-5" id="contactus">
                <h2 className="text-white float-center text-uppercase">Contact US</h2>
                <div className="row text-center d-flex justify-content-center">
                    <p className="h6">You only live once,if you do it right,once is enough.
                        Join with us..
                        We'll make your unforgetable day an everlasting one.</p>
                </div>
                <div className="row google-map">
                    <div id="map-container-google-1" className="z-depth-1-half map-container float-left col-sm pb-3">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63359.963472751726!2d79.92501554348969!3d7.009550253730186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f86bd75870f7%3A0xee362e29dbc079a6!2sKadawatha!5e0!3m2!1sen!2slk!4v1632926840452!5m2!1sen!2slk"
                            className="h-100 w-100 rounded " frameborder="0"></iframe>
                    </div>
                </div>
                <div className="lead text-dark rounded d-flex justify-content-center bg-white">

                    <a className="btn btn-outline-dark btn-floating m-1 float-left" href="#!" role="button">
                        <i className="fa fa-phone"></i> 075-4320399
                    </a>

                    <a className="btn btn-outline-dark btn-floating m-1 float-left" href="#!" role="button">
                        <i className="fa fa-home"></i> N0: 110,
                        Ihala Biyanvila,
                        Kadawatha.
                    </a>

                    <a className="btn btn-outline-dark btn-floating m-1 float-left" href="#!" role="button">
                        <i className="fa fa-envelope"></i> hkwewalagephotography@gmail.com
                    </a>

                </div>
            </div>

            <Footer />

        </div>


    );
}

export default Home;