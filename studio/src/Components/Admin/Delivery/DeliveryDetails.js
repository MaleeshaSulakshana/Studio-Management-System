import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const baseUrl = process.env.REACT_APP_API_URL;

function DeliveryDetails() {

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

    // Set for fields data
    const [orderId, setOrderId] = useState("");
    const [deliveryCharges, setDeliveryCharges] = useState("");

    const [deliveryPerson, setDeliveryPerson] = useState("");
    function eventDeliveryPerson(e) {
        setDeliveryPerson(e.target.value);
    };

    const [employees, setEmployees] = useState([]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [items, setItems] = useState("");
    const [status, setStatus] = useState("Pending");
    const [total, setTotal] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/employees")
            .then((res) => {
                setEmployees(res.data);
            });
    }, []);

    useEffect(async () => {
        let isYes = "no"
        axios.get(baseUrl + "/api/delivery/" + orderID)
            .then((res) => {
                isYes = "yes";
                setStatus(res.data.status);
                setDeliveryPerson(res.data.person)

                document.getElementById("update").style.display = "block";
                document.getElementById("remove").style.display = "block";
                document.getElementById("add").style.display = "none";
            });

        if (isYes === "no") {
            document.getElementById("update").style.display = "none";
            document.getElementById("remove").style.display = "none";
            document.getElementById("add").style.display = "block";
        }

    }, []);

    useEffect(async () => {
        axios.get(baseUrl + "/api/orders/" + orderID)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setNumber(res.data.number);
                setEmail(res.data.email);
                setItems(res.data.order_items);
                setAddress(res.data.address);
                setTotal(res.data.total);
            });
    }, []);

    async function setDelivery(event) {

        event.preventDefault();

        // Check is fields empty
        if (id !== "" && deliveryPerson != "") {

            const details = {
                id: id,
                name: name,
                number: number,
                email: email,
                address: address,
                order_items: items,
                status: "Assign",
                total: total,
                person: deliveryPerson
            };

            axios.post(baseUrl + "/api/delivery", details)
                .then((res) => {
                    if (res != null) {
                        Swal.fire({
                            icon: "success",
                            title: 'Success...',
                            text: "Delivery added successful!",
                        })
                        window.location.reload();
                    }
                });

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: 'Please select delivery person!',
            })
        }

    };

    async function UpdateDelivery(event) {

        event.preventDefault();

        // Check is fields empty
        if (id !== "" && deliveryPerson != "") {

            const details = {
                person: deliveryPerson
            };

            axios.put(baseUrl + "/api/delivery/person/" + orderID, details)
                .then((res) => {
                    if (res != null) {
                        Swal.fire({
                            icon: "success",
                            title: 'Success...',
                            text: "Delivery person update successful!",
                        })
                        window.location.reload();
                    }
                });

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: 'Please select delivery person!',
            })
        }

    };

    async function removeDelivery(event) {

        event.preventDefault();

        axios.delete(baseUrl + "/api/delivery/" + orderID)
            .then((res) => {
                if (res != null) {
                    Swal.fire({
                        icon: "success",
                        title: 'Success...',
                        text: "Delivery details remove successful!",
                    })

                    window.location.href = '/Admin/Delivery';
                }
            });
    }

    return (
        <div className="App text-center">
            <AdminNavbarComponent />

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
                            <label>Delivery Person</label>
                            <select className="form-control" value={deliveryPerson} onChange={eventDeliveryPerson}>
                                <option value="" selected>Select Delivery Person</option>

                                {employees.map((item, index) => {
                                    if (item.type === "Delivery") {
                                        return (<option key={index} value={item.id}>{item.name} ({item.type})</option>)
                                    }
                                })}

                            </select>
                        </div>

                        <input onClick={setDelivery} type="submit" id="add" value="Add to Delivery"
                            className="btn btn-primary mr-1" />
                        <input onClick={UpdateDelivery} type="button" value="Update" id="update"
                            className="btn btn-success mr-1" />
                        <input onClick={removeDelivery} type="button" value="Remove" id="remove"
                            className="btn btn-danger mr-1" />

                    </form>
                </div>
            </div>

            <Footer />

        </div>

    );
}

export default DeliveryDetails;