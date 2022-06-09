import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './NavbarComponent';
import Footer from "./Footer"
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = process.env.REACT_APP_API_URL;

var crypto = require("crypto");

function CheckOut() {

    const isCart = sessionStorage.getItem('cart') === null;
    if (isCart) {
        window.location = "/";
    }

    // Set for fields data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");

    async function checkOutCart(event) {

        event.preventDefault();
        var rand = crypto.randomBytes(5).toString('hex');
        let checkoutItems = "";
        const isCart = sessionStorage.getItem("cart") !== null;
        if (isCart) {
            let value = JSON.stringify(sessionStorage.getItem("cart"));
            let valueJson = value.split("+");
            let totalPrice = 0

            for (let i = 0; i < valueJson.length; i++) {
                let itemValue = valueJson[i]
                let replacedValue = itemValue.replace(/"/g, '');
                let splittedValue = replacedValue.split(",");
                let replacedSpace = splittedValue[0].replace(/ /g, '');
                totalPrice += Number(splittedValue[4])
                checkoutItems = checkoutItems + "Item-Code: " + replacedSpace + ", Item-Name: " + splittedValue[1] +
                    ", Qty: " + splittedValue[3] + " => ";

            }

            // Check is fields empty
            if (name !== '' && address !== '' && email !== '' && number !== '') {

                // Validate email
                if (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {

                    // Validate mobile number
                    if (!isNaN(+number) && number.length === 10) {

                        const details = {
                            id: rand,
                            name: name,
                            number: number,
                            email: email,
                            address: address,
                            order_items: checkoutItems,
                            status: "Pending",
                            total: (Number(totalPrice) + 300)
                        };

                        axios.post(baseUrl + "/api/orders", details)
                            .then((res) => {
                                if (res != null) {
                                    sessionStorage.removeItem('cart');

                                    Swal.fire({
                                        icon: "success",
                                        title: 'Success...',
                                        text: "Order added successful! Your order id is '" + rand + "'",
                                        showDenyButton: false,
                                        showCancelButton: false,
                                        confirmButtonText: 'Ok',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location = "/";
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

        }

    };


    return (
        <div className="App text-center">
            <NavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>CHECK OUT CART</h4>
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
                            <label>Address</label>
                            <textarea className="form-control" rows="3" placeholder="Address"
                                onChange={(e) => setAddress(e.target.value)}></textarea>
                        </div>

                        <input onClick={checkOutCart} type="submit" value="Check Out" className="btn btn-primary" />

                    </form>
                </div>
            </div >
            <Footer />

        </div >

    );
}

export default CheckOut;
