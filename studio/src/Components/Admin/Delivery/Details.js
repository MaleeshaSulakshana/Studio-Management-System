import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = process.env.REACT_APP_API_URL;

function Details() {

    const isPosition = sessionStorage.getItem("position") !== null;
    const isUserId = sessionStorage.getItem("userId") !== null;
    if (isUserId) {
        if (isPosition) {

            if (sessionStorage.getItem("position") !== "Delivery") {
                window.location.href = "/Login";
            }

        }
    } else {
        window.location.href = "/Login";
    }

    // Get url params
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let deliveryID = params.get('deliveryID');

    // Set for fields data
    const [deliveryStatus, setDeliveryStatus] = useState("");
    function eventDeliveryStatus(e) {
        setDeliveryStatus(e.target.value);
    };

    const [employees, setEmployees] = useState([]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [items, setItems] = useState("");
    const [status, setStatus] = useState("");
    const [total, setTotal] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/employees")
            .then((res) => {
                setEmployees(res.data);
            });
    }, []);

    useEffect(async () => {
        axios.get(baseUrl + "/api/delivery/" + deliveryID)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setNumber(res.data.number);
                setEmail(res.data.email);
                setItems(res.data.order_items);
                setAddress(res.data.address);
                setTotal(res.data.total);
                setStatus(res.data.status);
                if (res.data.status === "Assign") {
                    setDeliveryStatus("");
                } else {
                    setDeliveryStatus(res.data.status);
                }
            });

    }, []);


    async function setDelivery(event) {

        event.preventDefault();

        // Check is fields empty
        if (id !== "" && deliveryStatus != "none") {

            const details = {
                status: deliveryStatus,
            };

            axios.put(baseUrl + "/api/delivery/" + deliveryID, details)
                .then((res) => {
                    if (res != null) {
                        Swal.fire({
                            icon: "success",
                            title: 'Success...',
                            text: "Delivery status update successful!",
                        })
                        window.location.reload();
                    }
                });

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: 'Please select delivery status!',
            })
        }

    };

    return (
        <div className="App text-center">

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5 mb-5">
                    <h4 className="text-uppercase">DELIVERY DETAILS</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Order Id</label>
                            <input type="text" className="form-control" placeholder="Order Id" disabled
                                value={id} />
                        </div>

                        <div className="mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name" disabled
                                value={name} />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="text" className="form-control" placeholder="Phone Number" disabled
                                value={number} />
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Email" disabled
                                value={email} />
                        </div>

                        <div className="mb-3">
                            <label>Address</label>
                            <textarea className="form-control" rows="3" placeholder="Address" disabled
                                value={address}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Orders</label>
                            <textarea className="form-control" rows="3" placeholder="Orders" disabled
                                value={items}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Total Bill Amount</label>
                            <input type="text" className="form-control" placeholder="Total Bill Amount" disabled
                                value={total} />
                        </div>

                        <div className="mb-3">
                            <label>Status</label>
                            <input type="text" className="form-control" placeholder="Status" disabled
                                value={status} />
                        </div>

                        <div className="mb-3">
                            <label>Delivery Status</label>
                            <select className="form-control" onChange={eventDeliveryStatus} value={deliveryStatus}>
                                <option value="none" selected>Select Delivery Status</option>
                                <option value="On Delivery">On Delivery</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Returned">Returned</option>
                            </select>
                        </div>

                        <input onClick={setDelivery} type="submit" value="Update" className="btn btn-success mr-1" />

                    </form>
                </div>
            </div>

            <Footer />

        </div>

    );
}

export default Details;