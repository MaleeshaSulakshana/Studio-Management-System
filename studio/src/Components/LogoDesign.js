import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Swal from 'sweetalert2';
import NavbarComponent from './NavbarComponent';

var crypto = require("crypto");
const baseUrl = process.env.REACT_APP_API_URL;

function LogoDesign() {

    // Set for fields data
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [logoName, setLogoName] = useState("");
    const [description, setDescription] = useState("");

    const [selectedNeedAppointment, setSelectedNeedAppointment] = useState("");
    function eventNeedAppointmentChange(e) {
        setSelectedNeedAppointment(e.target.value);
    };

    // Method for pass data for insert logo design details
    async function logoDesignInsert(event) {

        event.preventDefault();
        var rand = crypto.randomBytes(5).toString('hex');

        // Check is fields empty
        if (name != '' && logoName != '' && email != '' && number != '' && description != '') {

            // Validate email
            if (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {

                // Validate mobile number
                if (!isNaN(+number) && number.length === 10) {

                    const details = {
                        id: rand,
                        name: name,
                        design: logoName,
                        email: email,
                        number: number,
                        appointment: selectedNeedAppointment,
                        description: description,
                        type: "logo",
                        status: "pending"
                    };

                    axios.post(baseUrl + "/api/graphicdesign", details)
                        .then((res) => {
                            if (res != null) {

                                Swal.fire({
                                    icon: "success",
                                    title: 'Success...',
                                    text: "Logo Design request successful! Your graphic id is '" + rand + "'",
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
                    <h4>LOGO DESIGN</h4>
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
                            <label>Logo Name</label>
                            <input type="test" className="form-control" placeholder="Logo Name"
                                onChange={(e) => setLogoName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Description</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Need An Appointment</label>
                            <select onChange={eventNeedAppointmentChange} class="form-control" aria-label="Default select example">
                                <option value="yes" selected>Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <input onClick={logoDesignInsert} type="button" value="Submit" className="btn btn-primary" />

                    </form>
                </div>
            </div >

            <Footer />

        </div>

    );
}

export default LogoDesign;
