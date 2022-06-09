import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/util.js';
import Swal from 'sweetalert2';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';

import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
var crypto = require("crypto");

function Comments() {

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

    // Method for add comment
    async function addNewComment(event) {

        event.preventDefault();
        var rand = crypto.randomBytes(8).toString('hex');

        // Check is fields empty
        if (name !== '' && comment !== '') {

            const details = {
                id: rand,
                name: name,
                comment: comment,
                album_id: albumID
            };

            axios.post(baseUrl + "/api/comments", details)
                .then((res) => {
                    if (res != null) {
                        Swal.fire({
                            icon: "success",
                            title: 'Success...',
                            text: "Comment added successful!",
                        })
                        window.location.reload();
                    }
                });

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: 'Fields are empty!',
            })
        }
    }

    return (
        <div className="Album">
            <NavbarComponent />

            <div className="container card p-3 mt-5">
                <div className="float-center">
                    <input className="form-control" type="text" placeholder="Your Name..."
                        onChange={(e) => setName(e.target.value)} />
                    <input className="form-control mt-2" type="text" placeholder="Type Comment..."
                        onChange={(e) => setComment(e.target.value)} />
                    <button onClick={addNewComment} className="btn btn-secondary mt-2">Add Comment</button>
                </div>
            </div>

            {
                albumsComments.map((item, index) => {
                    if (item.album_id == albumID) {

                        return (
                            <div className="container card p-3 mt-1">
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

            <Footer />
        </div>

    );
}

export default Comments;
