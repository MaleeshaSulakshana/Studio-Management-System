import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function Deliveries() {

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

    // Method for logout
    async function logout(event) {
        event.preventDefault();

        sessionStorage.removeItem("position");
        sessionStorage.removeItem("userId");
        window.location.href = "/Login";
    };

    const userId = sessionStorage.getItem("userId");

    const [orders, setOrders] = useState([]);

    // State for filter
    const [filterOrders, setFilterOrders] = useState([]);

    useEffect(async () => {
        axios.get(baseUrl + "/api/delivery")
            .then((res) => {
                setOrders(res.data);
                setFilterOrders(res.data);
            });
    }, []);

    // For search
    function searchValue(event) {
        const val = event.target.value;
        const filteredItems = orders.filter((value) => {
            return (value.name.includes(val))
        });
        setFilterOrders(filteredItems);
    }

    // For search
    function searchStatus(event) {
        const val = event.target.value;
        const filteredItems = orders.filter((value) => {
            return (value.status.includes(val))
        });
        setFilterOrders(filteredItems);
    }

    return (
        <div>

            <div className="container mt-5 div-h100 align-items-center justify-content-center">

                <div className="p-3 bg-dark text-white mb-3 d-flex justify-content-center">
                    <h3 className="lead text-uppercase">Deliveries</h3>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <input onChange={searchValue} type="text" className="form-control align-left w-25 p-3" placeholder="Search" />

                    <select onClick={searchStatus} className="form-control w-25">
                        <option value="" selected>All</option>
                        <option value="Assign">Assign</option>
                        <option value="On Delivery">On Delivery</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Returned">Returned</option>
                    </select>

                    <button onClick={logout} className="btn btn-secondary">LOGOUT</button>
                </div>

                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            filterOrders.map((item, index) => {
                                if (item.person === userId) {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.number}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <button className="btn btn-primary"
                                                    onClick={event =>
                                                        window.location.href = '/Delivery/Details?deliveryID=' + item.id}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }

                    </tbody>
                </table>

            </div>

            <Footer />
        </div>

    );
}

export default Deliveries;
