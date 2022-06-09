import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import $ from "jquery";
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function AlbumDetails() {

    const isPosition = sessionStorage.getItem("position") !== null;
    const isUserId = sessionStorage.getItem("userId") !== null;
    if (isUserId) {
        if (isPosition) {

            if (sessionStorage.getItem("position") !== "Admin") {
                window.location.href = "/Login";
            }

        }
    } else {
        window.location.href = "/Login";
    }

    // Get url params
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let albumID = params.get('albumID');

    // Set for fields data
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/album/" + albumID)
            .then((res) => {
                console.log("*" + res.data.title)
                setTitle(res.data.title);
                setDesc(res.data.desc);
            });
    }, []);

    // Method for pass album details
    async function updateAlbumDetails(event) {

        event.preventDefault();

        // Check is fields empty
        if (title !== '' && desc !== '') {

            const details = {
                title: title,
                desc: desc
            };

            axios.put(baseUrl + "/api/album/" + albumID, details)
                .then((res) => {
                    if (res != null) {
                        Swal.fire({
                            icon: "success",
                            title: 'Success...',
                            text: "Album details update successful!",
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

    };

    // Remove album
    async function removeAlbum(event) {

        event.preventDefault();

        axios.delete(baseUrl + "/api/album/" + albumID)
            .then((res) => {
                if (res != null) {
                    Swal.fire({
                        icon: "success",
                        title: 'Success...',
                        text: "Album details remove successful!",
                    })

                    window.location.href = '/Admin/Albums';
                }
            });
    }

    return (
        <div className="text-center">
            <AdminNavbarComponent />

            <div className="align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>ALBUM DETAILS</h4>
                    <form className="form">

                        <div className="mb-3">
                            <label>Album Title</label>
                            <input type="text" className="form-control" placeholder="Album Title" value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Album Details</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Album Details" value={desc}
                                onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>

                        <input onClick={updateAlbumDetails} type="submit" value="Update Album Details" className="btn btn-secondary mr-1" />
                        <input onClick={removeAlbum} type="button" value="Remove Album" className="btn btn-danger" />

                    </form>
                </div>
            </div >
            <Footer />

        </div >

    );
}

export default AlbumDetails;
