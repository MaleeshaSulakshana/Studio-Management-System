import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/util.js';
import Carousel from 'react-bootstrap/Carousel'
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';

import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function Album() {

    const [albums, setAlbums] = useState([]);
    useEffect(async () => {
        axios.get(baseUrl + "/api/album")
            .then((res) => {
                setAlbums(res.data);
            });
    }, []);

    return (
        <div className="Album">
            <NavbarComponent />

            {
                albums.map((item, index) => {
                    if ((index % 2) == 0) {
                        console.log("*****" + item.image1);
                        return (
                            <div className="container card p-3 mt-5">
                                <div className="float-center">
                                    <div className="h-50 w-50 float-right">

                                        <Carousel fade prevLabel="" nextLabel="">
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100 h-100"
                                                    src={item.image1}
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image2}
                                                    alt="Second slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image3}
                                                    alt="Second slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image4}
                                                    alt="Second slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image5}
                                                    alt="Second slide"
                                                />
                                            </Carousel.Item>
                                        </Carousel>

                                    </div>
                                    <div className="p-3 text-center">
                                        <h2 className="h3">{item.title}</h2>
                                        <p className="small p-2">{item.desc}</p>
                                        <button className="btn btn-secondary" onClick={event =>
                                            window.location.href = '/Album/Comment?albumID=' + item.id}>View Comment</button>
                                    </div>
                                </div>
                            </div>
                        )

                    } else {

                        return (
                            <div className="container card p-3 mt-5">
                                <div className="float-center">
                                    <div className="h-50 w-50 float-left">
                                        <Carousel prevLabel="" nextLabel="">
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100 h-100"
                                                    src={item.image1}
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image2}
                                                    alt="Second slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image3}
                                                    alt="Second slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image4}
                                                    alt="Second slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image5}
                                                    alt="Second slide"
                                                />
                                            </Carousel.Item>
                                        </Carousel>

                                    </div>
                                    <div className="p-3 text-center">
                                        <h2 className="h3">{item.title}</h2>
                                        <p className="small p-2">{item.desc}</p>
                                        <button className="btn btn-secondary" onClick={event =>
                                            window.location.href = '/Album/Comment?albumID=' + item.id}>View Comment</button>
                                    </div>
                                </div>

                            </div>
                        )

                    }
                })
            }

            <Footer />
        </div>

    );
}

export default Album;
