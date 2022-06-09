import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import AdminNavbarComponent from './AdminNavbarComponent';
import Footer from '../Footer';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function Dashboard() {

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

    // Set for fields data
    const [pendingEvents, setPendingEvents] = useState(0);
    const [completeEvents, setCompleteEvents] = useState(0);
    const [onDelivery, setOnDelivery] = useState(0);
    const [returnedOrders, setReturnedOrders] = useState(0);
    const [deliveredOrders, setDeliveredOrders] = useState(0);
    const [pendingGraphics, setPendingGraphics] = useState(0);
    const [completedGraphics, setCompletedGraphics] = useState(0);
    const [userTokens, setUserTokens] = useState(0);
    const [id, setId] = useState("");
    const date = new Date().toDateString();

    useEffect(async () => {
        axios.get(baseUrl + "/api/event")
            .then((res) => {
                const events = res.data
                let pendingCount = 0
                let completeCount = 0
                for (let index = 0; index < events.length; index++) {
                    if (events[index].status === "complete") {
                        completeCount = Number(completeCount) + 1;
                    } else {
                        pendingCount = Number(pendingCount) + 1;
                    }

                }

                setPendingEvents(pendingCount)
                setCompleteEvents(completeCount)

            });

        axios.get(baseUrl + "/api/delivery")
            .then((res) => {
                const events = res.data
                let onDeliveryStatus = 0
                let returned = 0
                let delivered = 0
                for (let index = 0; index < events.length; index++) {
                    if (events[index].status === "On Delivery") {
                        onDeliveryStatus = Number(onDeliveryStatus) + 1;
                    } else if (events[index].status === "Returned") {
                        returned = Number(returned) + 1;
                    } else if (events[index].status === "Accepted") {
                        delivered = Number(delivered) + 1;
                    }

                }

                setOnDelivery(onDeliveryStatus);
                setReturnedOrders(returned);
                setDeliveredOrders(delivered);

            });

        axios.get(baseUrl + "/api/graphicdesign")
            .then((res) => {
                const events = res.data
                let graphicCompleted = 0
                let graphicPending = 0
                for (let index = 0; index < events.length; index++) {
                    if (events[index].status === "complete") {
                        graphicCompleted = Number(graphicCompleted) + 1;
                    } else if (events[index].status === "pending") {
                        graphicPending = Number(graphicPending) + 1;
                    }

                }

                setCompletedGraphics(graphicCompleted);
                setPendingGraphics(graphicPending);

            });

        axios.get(baseUrl + "/api/token")
            .then((res) => {
                const events = res.data
                let tokens = 0
                for (let index = 0; index < events.length; index++) {
                    tokens = Number(tokens) + 1;
                }

                setUserTokens(tokens);

            });
    }, []);


    return (
        <div className="text-center">
            <AdminNavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-9 card pt-4 pb-5 pl-3 pr-3 mt-5 text-center align-items-center d-flex justify-content-center">

                    <h4 className="text-uppercase text-dark">Welcome to dashboard</h4>

                    <div className="col-md-10 text-left align-items-center d-flex flex-row justify-content-between mt-5 mb-1">

                        <div className="bg-warning h-25 col-md-4 text-light text-center p-4 m-2 rounded">
                            <h5>Date</h5>
                            <h6>{date}</h6>
                        </div>

                        <div className="bg-danger h-25 col-md-4 text-light text-center p-4 m-2 rounded">
                            <h5>Pending Events</h5>
                            <h6>{pendingEvents}</h6>
                        </div>

                        <div className="bg-success h-25 col-md-4 text-light text-center p-4 m-2 rounded">
                            <h5>Complete Events</h5>
                            <h6>{completeEvents}</h6>
                        </div>

                    </div>

                    <div className="col-md-10 text-left align-items-center d-flex flex-row justify-content-between mt-1 mb-1">

                        <div className="bg-info h-25 col-md-4 text-light text-center p-4 m-2 rounded">
                            <h5>On Delivery</h5>
                            <h6>{onDelivery}</h6>
                        </div>

                        <div className="bg-warning h-25 col-md-4 text-light text-center p-4 m-2 rounded">
                            <h5>Returned Orders</h5>
                            <h6>{returnedOrders}</h6>
                        </div>

                        <div className="bg-danger h-25 col-md-4 text-light text-center p-4 m-2 rounded">
                            <h5>Delivered Order</h5>
                            <h6>{deliveredOrders}</h6>
                        </div>

                    </div>

                    <div className="col-md-10 text-left align-items-center d-flex flex-row justify-content-between mt-1 mb-1">

                        <div className="bg-primary h-25 col-md-4 text-light text-center p-4 m-2 rounded">
                            <h5>Pending Graphic Designs</h5>
                            <h6>{pendingGraphics}</h6>
                        </div>

                        <div className="bg-primary h-25 col-md-4 text-light text-center p-4 m-2 rounded">
                            <h5>Complete Graphic designs</h5>
                            <h6>{completedGraphics}</h6>
                        </div>

                        <div className="bg-primary h-25 col-md-4 text-light text-center p-4 m-2 rounded">
                            <h5>User Inquiry Tokens</h5>
                            <h6>{userTokens}</h6>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />

        </div>

    );
}

export default Dashboard;
