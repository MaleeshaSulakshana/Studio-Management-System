import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './NavbarComponent';
import Footer from "./Footer"
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = process.env.REACT_APP_API_URL;

var crypto = require("crypto");

function Token() {

    // Set for fields data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [inquiry, setInquiry] = useState("");

    // Method for pass data for insert token details
    async function insertToken(event) {

        event.preventDefault();
        var rand = crypto.randomBytes(5).toString('hex');

        // Check is fields empty
        if (name !== '' && inquiry !== '' && email !== '' && number !== '') {

            // Validate email
            if (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {

                // Validate mobile number
                if (!isNaN(+number) && number.length === 10) {

                    const details = {
                        id: rand,
                        name: name,
                        number: number,
                        email: email,
                        inquiry: inquiry
                    };

                    axios.post(baseUrl + "/api/token", details)
                        .then((res) => {
                            if (res != null) {
                                Swal.fire({
                                    icon: "success",
                                    title: 'Success...',
                                    text: "Item added successful!",
                                })
                                window.location.reload();
                            }
                        });

                    Swal.fire({
                        icon: "success",
                        title: 'Success...',
                        text: "success",
                    })
                    window.location.reload();

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
                    <h4>SUBMIT A TOKEN</h4>
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
                            <label>Inquiry</label>
                            <textarea className="form-control" rows="3" placeholder="Inquiry"
                                onChange={(e) => setInquiry(e.target.value)}></textarea>
                        </div>

                        <input onClick={insertToken} type="submit" value="Add Inquiry" className="btn btn-primary" />

                    </form>
                </div>
            </div >
            <Footer />

        </div >

    );
}

export default Token;
