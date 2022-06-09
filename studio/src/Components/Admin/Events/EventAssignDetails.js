import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const baseUrl = process.env.REACT_APP_API_URL;

function EventAssignDetails() {

    const isPosition = sessionStorage.getItem("position") !== null;
    const isUserId = sessionStorage.getItem("userId") !== null;
    if (isUserId) {
        if (isPosition) {

            if (sessionStorage.getItem("position") !== "Video Grapher") {
                if (sessionStorage.getItem("position") !== "Photo Grapher") {
                    window.location.href = "/Login";
                }
            }

        }
    } else {
        window.location.href = "/Login";
    }

    // Get url params
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let eventID = params.get('eventID');

    // Set for fields data
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [event, setEvent] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/event/" + eventID)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setAddress(res.data.address);
                setEmail(res.data.email);
                setNumber(res.data.number);
                setDate(res.data.date);
                setTime(res.data.time);
                setEvent(res.data.eventType);

                if (res.data.status) {
                    document.getElementById("btnComplete").style.display = "none";
                }

            });
    }, []);

    async function setComplete(event) {

        event.preventDefault();

        if (id !== "") {

            const details = {
                status: "Complete"
            };

            axios.put(baseUrl + "/api/event/status/" + eventID, details)
                .then((res) => {
                    if (res != null) {
                        Swal.fire({
                            icon: "success",
                            title: 'Success...',
                            text: "Status complete set successful!",
                        })
                        window.location.reload();
                    }
                });

        } else {
            Swal.fire({
                icon: "warning",
                title: 'Warning...',
                text: "Fields are empty",
            })
        }

    };

    return (

        <div className="App text-center">

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5 mb-5">
                    <h4>EVENT DETAILS</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Event Id</label>
                            <input type="text" className="form-control" placeholder="Event Id"
                                value={id} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Client Name</label>
                            <input type="text" className="form-control" placeholder="Client Name"
                                value={name} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Address</label>
                            <textarea className="form-control" rows="3" placeholder="Address"
                                value={address} disabled></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Email"
                                value={email} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="text" className="form-control" placeholder="Phone Number"
                                value={number} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Event Date</label>
                            <input type="text" className="form-control" placeholder="Event Date"
                                value={date} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Event Time</label>
                            <input type="text" className="form-control" placeholder="Event Time"
                                value={time} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Event Type</label>
                            <input type="text" className="form-control" placeholder="Event Type"
                                value={event} disabled />
                        </div>

                        <input onClick={setComplete} id="btnComplete" type="submit" value="Complete" className="btn btn-success" />

                    </form>
                </div>
            </div>

        </div>

    );
}

export default EventAssignDetails;
