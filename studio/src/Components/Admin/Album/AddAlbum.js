import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import $ from "jquery";
import firebase from '../../firebaseConfiguration';

import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
var crypto = require("crypto");

function AddAlbum() {

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

    // Set for fields data
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [images, setImages] = useState([]);

    function setFile(event) {
        let imageSet = [];
        let i = 0
        for (i; i < event.length; i++) {
            imageSet.push(event[i])
        }

        if (imageSet.length != 5) {
            imageSet = [];
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: 'Please select only 5 images!',
            })
        } else {
            setImages(imageSet);
        }

    }

    // Method for pass album details
    async function addNewAlbum(event) {

        event.preventDefault();
        var rand = crypto.randomBytes(5).toString('hex');

        // Check is fields empty
        if (title !== '' && desc !== '' && images.length == 5) {


            let imageUrl1 = "";
            let imageUrl2 = "";
            let imageUrl3 = "";
            let imageUrl4 = "";
            let imageUrl5 = "";

            let storageRef = firebase.storage().ref("album/" + rand + "/" + images[0].name);
            let uploadTask = storageRef.put(images[0]);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                () => {
                    storageRef.getDownloadURL()
                        .then(url => {
                            imageUrl1 = url;

                            let storageRef2 = firebase.storage().ref("album/" + rand + "/" + images[1].name);
                            let uploadTask2 = storageRef2.put(images[1]);
                            uploadTask2.on(firebase.storage.TaskEvent.STATE_CHANGED,
                                () => {
                                    storageRef2.getDownloadURL()
                                        .then(url1 => {
                                            imageUrl2 = url1;

                                            let storageRef3 = firebase.storage().ref("album/" + rand + "/" + images[2].name);
                                            let uploadTask3 = storageRef3.put(images[2]);
                                            uploadTask3.on(firebase.storage.TaskEvent.STATE_CHANGED,
                                                () => {
                                                    storageRef3.getDownloadURL()
                                                        .then(url3 => {
                                                            imageUrl3 = url3;

                                                            let storageRef4 = firebase.storage().ref("album/" + rand + "/" + images[3].name);
                                                            let uploadTask4 = storageRef4.put(images[3]);
                                                            uploadTask4.on(firebase.storage.TaskEvent.STATE_CHANGED,
                                                                () => {
                                                                    storageRef4.getDownloadURL()
                                                                        .then(url4 => {
                                                                            imageUrl4 = url4;

                                                                            let storageRef5 = firebase.storage().ref("album/" + rand + "/" + images[4].name);
                                                                            let uploadTask5 = storageRef5.put(images[4]);
                                                                            uploadTask5.on(firebase.storage.TaskEvent.STATE_CHANGED,
                                                                                () => {
                                                                                    storageRef5.getDownloadURL()
                                                                                        .then(url5 => {
                                                                                            imageUrl5 = url5;

                                                                                            const details = {
                                                                                                id: rand,
                                                                                                title: title,
                                                                                                desc: desc,
                                                                                                image1: imageUrl1,
                                                                                                image2: imageUrl2,
                                                                                                image3: imageUrl3,
                                                                                                image4: imageUrl4,
                                                                                                image5: imageUrl5
                                                                                            };

                                                                                            axios.post(baseUrl + "/api/album", details)
                                                                                                .then((res) => {
                                                                                                    if (res != null) {
                                                                                                        Swal.fire({
                                                                                                            icon: "success",
                                                                                                            title: 'Success...',
                                                                                                            text: "Album added successful!",
                                                                                                        })
                                                                                                        window.location.reload();
                                                                                                    }
                                                                                                });

                                                                                        })
                                                                                })

                                                                        })
                                                                })

                                                        })
                                                })

                                        })
                                })

                        })
                })

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: 'Fields are empty or check image count!',
            })
        }

    };

    return (
        <div className="App text-center">
            <AdminNavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>ADD NEW ALBUM</h4>
                    <form className="form">

                        <div className="mb-3">
                            <label>Album Title</label>
                            <input type="text" className="form-control" placeholder="Album Title"
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Album Details</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Album Details"
                                onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>

                        <div className="mb-3 form-group files">
                            <label>Upload Album Images</label>
                            <input onChange={(e) => setFile(e.target.files)} type="file" className="form-control" accept="image/*" multiple />
                        </div>

                        <input type="submit" onClick={addNewAlbum} value="Add New Album" className="btn btn-primary" />

                    </form>
                </div>
            </div >
            <Footer />

        </div >

    );
}

export default AddAlbum;
