import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function EventAssign() {

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

    const userId = sessionStorage.getItem("userId");
    const [events, setEvents] = useState([]);

    // State for filter
    const [filterEvents, setFilterEvents] = useState([]);

    useEffect(async () => {
        axios.get(baseUrl + "/api/event")
            .then((res) => {
                setEvents(res.data);
                setFilterEvents(res.data);
            });
    }, []);

    // For search
    function searchValue(event) {
        const val = event.target.value;
        const filteredTokens = events.filter((value) => {
            return (value.name.includes(val))
        });
        setFilterEvents(filteredTokens);
    }

    function searchStatus(event) {
        const val = event.target.value;
        const filteredTokens = events.filter((value) => {
            return (value.status.includes(val))
        });
        setFilterEvents(filteredTokens);
    }

    // Method for logout
    async function logout(event) {
        event.preventDefault();

        sessionStorage.removeItem("position");
        sessionStorage.removeItem("userId");
        window.location.href = "/Login";
    };

    return (
        <div>

            <div className="container div-h100 align-items-center justify-content-center">

                <div className="p-3 bg-dark text-white mb-3">
                    <h3 className="lead text-uppercase">Events</h3>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <input onChange={searchValue} type="text" className="form-control align-left w-25 p-3" placeholder="Search" />

                    <select onClick={searchStatus} className="form-control w-25">
                        <option value="Pending">Pending</option>
                        <option value="Complete">Complete</option>
                    </select>

                    <button onClick={logout} className="btn btn-secondary">LOGOUT</button>
                </div>

                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Event Id</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Event Type</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            filterEvents.map((item, index) => {
                                if (item.assign === userId) {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.number}</td>
                                            <td>{item.date}</td>
                                            <td>{item.time}</td>
                                            <td>{item.eventType}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button className="btn btn-primary"
                                                    onClick={event =>
                                                        window.location.href = '/EventAssign/EventAssignDetails?eventID=' + item.id}>
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

        </div>

    );
}

export default EventAssign;
