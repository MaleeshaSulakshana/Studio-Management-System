import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function BookingDetails() {

    // Get url params
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let eventId = params.get('eventId');

    // Set for fields data
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [selectedEventType, setSelectedEventType] = useState("");
    // Set selected event type option
    function eventTypeChange(e) {
        setSelectedEventType(e.target.value);
    };

    const [selectedServiceType, setSelectedServiceType] = useState("");
    // Set selected service type option
    function serviceTypeChange(e) {
        setSelectedServiceType(e.target.value);
    };

    useEffect(async () => {
        axios.get(baseUrl + "/api/event/" + eventId)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setAddress(res.data.address);
                setEmail(res.data.email);
                setNumber(res.data.number);
                setDate(res.data.date);
                setTime(res.data.time);
                setSelectedEventType(res.data.eventType);
                setSelectedServiceType(res.data.serviceType);

            });
    }, []);

    // Method for pass data for insert booking details
    async function updateBooking(event) {

        event.preventDefault();

        // Check is fields empty
        if (name !== '' && address !== '' && email !== '' && number !== '' && date !== ''
            && time !== '' && selectedEventType !== 'none' && selectedServiceType !== 'none') {

            // Validate email
            if (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {

                // Validate mobile number
                if (!isNaN(+number) && number.length === 10) {

                    const details = {
                        name: name,
                        address: address,
                        email: email,
                        number: number,
                        date: date,
                        time: time,
                        eventType: selectedEventType,
                        serviceType: selectedServiceType
                    };

                    axios.put(baseUrl + "/api/event/" + eventId, details)
                        .then((res) => {
                            if (res != null) {
                                Swal.fire({
                                    icon: "success",
                                    title: 'Success...',
                                    text: "Event Details update successful!",
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

    // Method for remove event
    async function removeEvent(event) {

        event.preventDefault();

        axios.delete(baseUrl + "/api/event/" + eventId)
            .then((res) => {
                if (res != null) {
                    Swal.fire({
                        icon: "success",
                        title: 'Success...',
                        text: "Event remove successful!",
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
                    <h4>BOOKING EVENT DETAILS</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Event Id</label>
                            <input type="text" className="form-control" placeholder="Event Id" value={id}
                                onChange={(e) => setId(e.target.value)} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Address</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Address" value={address}
                                onChange={(e) => setAddress(e.target.value)}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="phone" className="form-control" placeholder="Phone Number" value={number}
                                onChange={(e) => setNumber(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Event Date</label>
                            <input type="date" className="form-control" placeholder="Event Date" value={date}
                                onChange={(e) => setDate(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Event Time</label>
                            <input type="time" className="form-control" placeholder="Event Time" value={time}
                                onChange={(e) => setTime(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Event Type</label>
                            <select className="form-control" value={selectedEventType} onChange={eventTypeChange}>
                                <option value="none" selected>Select Event Type</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Festival Activity">Festival Activity</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Service Type</label>
                            <select className="form-control" value={selectedServiceType} onChange={serviceTypeChange}>
                                <option value="none" selected>Select Service Type</option>
                                <option value="Video Grapher">Video Grapher</option>
                                <option value="Photo Grapher">Photo Grapher</option>
                            </select>
                        </div>

                        <input onClick={updateBooking} type="submit" value="Update Booking Details" className="btn btn-secondary mr-1" />
                        <input onClick={removeEvent} type="button" value="Remove Booking" className="btn btn-danger" />

                    </form>
                </div>
            </div>

            <Footer />

        </div>

    );
}

export default BookingDetails;
