import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import NavbarComponent from './NavbarComponent';
import firebase from './firebaseConfiguration';

const baseUrl = process.env.REACT_APP_API_URL;
var crypto = require("crypto");
var fs = require('fs');

function GraphicDesigner() {

    // Set for fields data
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");

    const [selectedNeedAppointment, setSelectedNeedAppointment] = useState("");
    function eventNeedAppointmentChange(e) {
        setSelectedNeedAppointment(e.target.value);
    };

    const [selectedImage, setSelectedImage] = useState([]);
    function selectedImageChange(event) {

        setSelectedImage(event[0]);
        setFile(event[0].name);
        console.warn("images", event[0])

    };

    // Method for pass data for insert logo design details
    async function photoEditInsert(event) {

        event.preventDefault();
        var rand = crypto.randomBytes(5).toString('hex');

        // Check is fields empty
        if (name !== '' && email !== '' && number !== '' && description !== '' && file !== '') {

            // Validate email
            if (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {

                // Validate mobile number
                if (!isNaN(+number) && number.length === 10) {

                    let storageRef = firebase.storage().ref("graphic/" + rand + "/" + file);
                    let uploadTask = storageRef.put(selectedImage);
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                        () => {
                            storageRef.getDownloadURL()
                                .then(url => {

                                    const details = {
                                        id: rand,
                                        name: name,
                                        design: url,
                                        email: email,
                                        number: number,
                                        appointment: selectedNeedAppointment,
                                        description: description,
                                        type: "edit",
                                        status: "pending"
                                    };

                                    axios.post(baseUrl + "/api/graphicdesign", details)
                                        .then((res) => {
                                            if (res != null) {

                                                Swal.fire({
                                                    icon: "success",
                                                    title: 'Success...',
                                                    text: "Photo edit request successful! Your graphic id is '" + rand + "'",
                                                    showDenyButton: false,
                                                    showCancelButton: false,
                                                    confirmButtonText: 'Ok',
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        window.location.reload();
                                                    }
                                                })

                                            }
                                        });

                                })
                        })

                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'WARNING',
                        text: 'Please check your mobile number!',
                    })
                }

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'WARNING',
                    text: 'Please check your email pattern!',
                })
            }

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: 'Fields are empty!',
            })
        }

    };

    return (
        <div>
            <NavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5 mb-5">
                    <h4>PHOTO EDITING</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="phone" className="form-control" placeholder="Phone Number"
                                onChange={(e) => setNumber(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Description</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Need An Appointment</label>
                            <select onChange={eventNeedAppointmentChange} className="form-control" aria-label="Default select example">
                                <option value="yes" selected>Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div className="mb-3 form-group files">
                            <label>Upload Image</label>
                            <input onChange={(e) => selectedImageChange(e.target.files)} type="file" className="form-control" accept="image/*" />
                        </div>

                        <input onClick={photoEditInsert} type="button" value="Submit" className="btn btn-primary" />

                    </form>
                </div>
            </div >

            <Footer />

        </div>

    );
}

export default GraphicDesigner;
