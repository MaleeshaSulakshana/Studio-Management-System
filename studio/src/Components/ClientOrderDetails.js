import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function ClientOrderDetails() {

    // Get url params
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let orderId = params.get('orderId');

    // Set for fields data
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/orders/" + orderId)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setNumber(res.data.number);
                setEmail(res.data.email);
                setAddress(res.data.address);
            });
    }, []);

    // Method for update order
    async function updateOrder(event) {

        event.preventDefault();

        // Check is fields empty
        if (name !== '' && address !== '' && email !== '' && number !== '') {

            // Validate email
            if (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {

                // Validate mobile number
                if (!isNaN(+number) && number.length === 10) {

                    const details = {
                        name: name,
                        address: address,
                        email: email,
                        number: number
                    };

                    axios.put(baseUrl + "/api/orders/update/" + orderId, details)
                        .then((res) => {
                            if (res != null) {
                                Swal.fire({
                                    icon: "success",
                                    title: 'Success...',
                                    text: "Order Details update successful!",
                                })
                                window.location.reload();
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

    // Method for remove order
    async function removeOrder(event) {

        event.preventDefault();

        axios.delete(baseUrl + "/api/orders/" + orderId)
            .then((res) => {
                if (res != null) {
                    Swal.fire({
                        icon: "success",
                        title: 'Success...',
                        text: "Order remove successful!",
                    })

                    window.location.href = '/';
                }
            });
    }

    return (
        <div className="App text-center">
            <NavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>ORDER DETAILS</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Order Id</label>
                            <input type="text" className="form-control" placeholder="Order Id" value={id}
                                onChange={(e) => setId(e.target.value)} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="phone" className="form-control" placeholder="Phone Number" value={number}
                                onChange={(e) => setNumber(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Address</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Address" value={address}
                                onChange={(e) => setAddress(e.target.value)}></textarea>
                        </div>

                        <input onClick={updateOrder} type="submit" value="Update Order Details" className="btn btn-secondary mr-1" />
                        <input onClick={removeOrder} type="button" value="Remove Order" className="btn btn-danger" />

                    </form>
                </div>
            </div>

            <Footer />

        </div>

    );
}

export default ClientOrderDetails;
