import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import $ from "jquery";
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function Login() {
    const isPosition = sessionStorage.getItem("position") !== null;
    const isUserId = sessionStorage.getItem("userId") !== null;
    if (isUserId) {
        if (isPosition) {

            const position = sessionStorage.getItem("position");

            if (position === "Delivery") {
                window.location.href = "/Delivery";
            } else if (position === "Video Grapher" || position === "Photo Grapher") {
                window.location.href = "/EventAssign";
            } else if (position === "Graphic Designer") {
                window.location.href = "/GraphicsDesign";
            } else if (position === "Admin") {
                window.location.href = "/Admin";
            }

        }
    }

    // Set for fields data
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");

    // Method for login
    async function userLogin(event) {
        event.preventDefault();

        // Check is fields empty
        if (email !== '' && psw !== '') {

            // Validate email
            if (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {

                const details = {
                    email: email,
                    psw: psw
                };

                axios.post(baseUrl + "/api/login", details)
                    .then((res) => {

                        if (res.data == "error") {
                            Swal.fire({
                                icon: "warning",
                                title: 'Error...',
                                text: "Please check email and password",
                            })
                        } else {

                            let value = res.data;
                            var splitted = value.split("$");
                            sessionStorage.setItem("position", splitted[0]);
                            sessionStorage.setItem("userId", splitted[1]);

                            const isPosition = sessionStorage.getItem("position") !== null;
                            const isUserId = sessionStorage.getItem("userId") !== null;
                            if (isUserId) {
                                if (isPosition) {

                                    const position = sessionStorage.getItem("position");

                                    if (position === "Delivery") {
                                        window.location.href = "/Delivery";
                                    } else if (position === "Video Grapher" || position === "Photo Grapher") {
                                        window.location.href = "/EventAssign";
                                    } else if (position === "Graphic Designer") {
                                        window.location.href = "/GraphicsDesign";
                                    } else if (position === "Admin") {
                                        window.location.href = "/Admin";
                                    } else {
                                        window.location.href = "/Login";
                                    }

                                }
                            } else {
                                window.location.href = "/Login";
                            }

                        }
                    });

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

            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 h-75">
                    <h4>ADMINISTRATION LOGIN</h4>
                    <form className="form">

                        <div className="mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"
                                onChange={(e) => setPsw(e.target.value)} />
                        </div>

                        <input onClick={userLogin} type="submit" value="Login" className="btn btn-primary w-25" />

                    </form>
                </div>
            </div >

        </div >

    );
}

export default Login;
