import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/util.js';
import AdminNavbarComponent from '../AdminNavbarComponent';
import Footer from '../../Footer';

import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
var crypto = require("crypto");

function ViewComments() {

    // Get url params
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let albumID = params.get('albumID');

    // Set for fields data
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const [albumsComments, setAlbumsComments] = useState([]);
    useEffect(async () => {
        axios.get(baseUrl + "/api/comments")
            .then((res) => {
                setAlbumsComments(res.data);
            });
    }, []);

    return (
        <div className="Album">
            <AdminNavbarComponent />

            <div className="mt-5">
                {
                    albumsComments.map((item, index) => {
                        if (item.album_id == albumID) {

                            return (
                                <div key={index} className="container card p-3 mt-1">
                                    <div className="float-center w-100">
                                        <div className="float-left">
                                            <span className="float-left font-weight-bold">{item.name}</span>
                                        </div>
                                        <br />
                                        <div className="float-left font-weight-light">
                                            <p className="float-left">{item.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            )

                        }

                    })
                }
            </div>

            <Footer />
        </div>

    );
}

export default ViewComments;
