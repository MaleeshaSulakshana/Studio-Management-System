import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const baseUrl = process.env.REACT_APP_API_URL;

function EventDetails() {

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
    const [service, setService] = useState("");
    const [image, setImage] = useState("");

    const [assignPerson, setAssignPerson] = useState("");
    function selectedAssignPerson(e) {
        setAssignPerson(e.target.value);
    };

    const [employees, setEmployees] = useState([]);

    useEffect(async () => {
        axios.get(baseUrl + "/api/employees")
            .then((res) => {
                setEmployees(res.data);
            });
    }, []);

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
                setService(res.data.serviceType);
                setImage(res.data.paymentImage);

                if (res.data.assign === "") {
                    setAssignPerson("");
                } else {
                    setAssignPerson(res.data.assign);
                }
            });
    }, []);

    async function setAssignEmployee(event) {

        event.preventDefault();

        if (assignPerson !== "" && id !== "") {

            const details = {
                assign: assignPerson
            };

            const res = axios.put(baseUrl + "/api/event/assign/" + eventID, details)
                .then((res) => {
                    if (res != null) {
                        Swal.fire({
                            icon: "success",
                            title: 'Success...',
                            text: "Employee assign set successful!",
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
            <AdminNavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
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

                        <div className="mb-3">
                            <label>Service Type</label>
                            <input type="text" className="form-control" placeholder="Service Type"
                                value={service} disabled />
                        </div>

                        <div className="mb-3">
                            <a href={image} className="form-control" download>Download Image</a>
                        </div>

                        <div className="mb-3">
                            <label>Assign Person</label>
                            <select className="form-control" onChange={selectedAssignPerson} value={assignPerson}>
                                <option value="" selected>Select Assign Person</option>

                                {employees.map((item, index) => {
                                    if (item.type === "Photo Grapher" || item.type === "Video Grapher") {
                                        return (<option key={index} value={item.id}>{item.name} ({item.type})</option>)
                                    }
                                })}

                            </select>
                        </div>

                        <input onClick={setAssignEmployee} type="button" value="Set Assign" className="btn btn-success" />

                    </form>
                </div>
            </div>


            <Footer />

        </div>

    );
}

export default EventDetails;
