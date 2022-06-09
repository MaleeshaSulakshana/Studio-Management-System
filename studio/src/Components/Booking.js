import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './NavbarComponent';
import Footer from "./Footer"
import $ from "jquery";
import axios from 'axios';
import firebase from './firebaseConfiguration';


const baseUrl = process.env.REACT_APP_API_URL;

var crypto = require("crypto");

function Booking() {

    // Set for fields data
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [file, setFile] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    function selectedImageChange(event) {
        console.warn(event[0]);
        setSelectedImage(event[0]);
        setFile(event[0].name);

    };

    const [selectedEventType, setSelectedEventType] = useState("");
    // Set selected event type option
    function eventTypeChange(e) {
        setSelectedEventType(e.target.value);
    };

    const [selectedServiceType, setSelectedServiceType] = useState("");
    // Set selected service type option
    function serviceTypeChange(e) {
        setSelectedServiceType(e.target.value);
    };

    // Method for pass data for insert booking details
    async function insertBooking(event) {

        event.preventDefault();
        var rand = crypto.randomBytes(5).toString('hex');

        // Check is fields empty
        if (name !== '' && address !== '' && email !== '' && number !== '' && date !== ''
            && time !== '' && selectedEventType !== 'none' && selectedServiceType !== 'none' && file !== '') {

            // Validate email
            if (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {

                // Validate mobile number
                if (!isNaN(+number) && number.length === 10) {

                    let storageRef = firebase.storage().ref("payment/" + rand + "/" + file);
                    let uploadTask = storageRef.put(selectedImage);
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                        () => {
                            storageRef.getDownloadURL()
                                .then(url => {

                                    const details = {
                                        id: rand,
                                        name: name,
                                        address: address,
                                        email: email,
                                        number: number,
                                        date: date,
                                        time: time,
                                        eventType: selectedEventType,
                                        serviceType: selectedServiceType,
                                        paymentImage: url,
                                        assign: "",
                                        status: "Pending"
                                    };

                                    axios.post(baseUrl + "/api/event", details)
                                        .then((res) => {
                                            if (res != null) {

                                                Swal.fire({
                                                    icon: "success",
                                                    title: 'Success...',
                                                    text: "Event added successful! Your event id is '" + rand + "'",
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
        <div className="App text-center">
            <NavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>BOOK FOR EVENT</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Address</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Address"
                                onChange={(e) => setAddress(e.target.value)}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="phone" className="form-control" placeholder="Phone Number"
                                onChange={(e) => setNumber(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Event Date</label>
                            <input type="date" className="form-control" placeholder="Event Date"
                                onChange={(e) => setDate(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Event Time</label>
                            <input type="time" className="form-control" placeholder="Event Time"
                                onChange={(e) => setTime(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Event Type</label>
                            <select className="form-control" aria-label="Default select example" onChange={eventTypeChange}>
                                <option value="none" selected>Select Event Type</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Festival Activity">Festival Activity</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Service Type</label>
                            <select className="form-control" aria-label="Default select example" onChange={serviceTypeChange}>
                                <option value="none" selected>Select Service Type</option>
                                <option value="Video Grapher">Video Grapher</option>
                                <option value="Photo Grapher">Photo Grapher</option>
                            </select>
                        </div>

                        <div className="mb-3 form-group files">
                            <label>Upload Advance Payment Receipt </label>
                            <input onChange={(e) => selectedImageChange(e.target.files)} type="file" className="form-control" accept="image/*" />
                        </div>

                        <input type="submit" onClick={insertBooking} value="Book Now" className="btn btn-primary" />

                    </form>
                </div>
            </div >

            <Footer />

        </div >

    );
}

export default Booking;
