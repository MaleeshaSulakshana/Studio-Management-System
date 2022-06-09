import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function OrderDetails() {

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
    let orderID = params.get('orderID');

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [items, setItems] = useState("");
    const [status, setStatus] = useState("");
    const [total, setTotal] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/orders/" + orderID)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setNumber(res.data.number);
                setEmail(res.data.email);
                setItems(res.data.order_items);
                setAddress(res.data.address);
                setStatus(res.data.status);
                setTotal(res.data.total);

                if (res.data.status === "Complete") {
                    document.getElementById("isComplete").style.display = "none";
                }

            });
    }, []);

    async function packingComplete(event) {

        event.preventDefault();

        // Check is fields empty
        if (id !== '') {

            const details = {
                status: "Complete"
            };

            axios.put(baseUrl + "/api/orders/" + orderID, details)
                .then((res) => {
                    if (res != null) {
                        Swal.fire({
                            icon: "success",
                            title: 'Success...',
                            text: "Order complete update successful!",
                        })
                        window.location.reload();
                    }
                });

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: 'Order not selected!',
            })
        }

    };

    return (
        <div>
            <AdminNavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>ORDER DETAILS</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Order Id</label>
                            <input type="text" className="form-control" placeholder="Order Id"
                                value={id} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Customer Name</label>
                            <input type="text" className="form-control" placeholder="Customer Name"
                                value={name} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Mobile Number</label>
                            <input type="text" className="form-control" placeholder="Mobile Number"
                                value={number} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Email"
                                value={email} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Address</label>
                            <textarea className="form-control" rows="3" placeholder="Address" value={address}
                                disabled></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Order Items</label>
                            <textarea className="form-control" rows="3" placeholder="Order Items" value={items}
                                disabled></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Total With Delivery Charges</label>
                            <input type="text" className="form-control" placeholder="Total With Delivery Charges"
                                value={"Rs. " + total} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Status</label>
                            <input type="text" className="form-control" placeholder="Status"
                                value={status} disabled />
                        </div>

                        <input onClick={packingComplete} type="button" value="Packing Complete" className="btn btn-success"
                            id="isComplete" />

                    </form>
                </div>
            </div>


            <Footer />
        </div>

    );
}

export default OrderDetails;
