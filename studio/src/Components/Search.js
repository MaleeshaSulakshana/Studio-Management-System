import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function Search() {

    // Set for fields data
    const [search, setSearch] = useState("");

    const [selectedSearchType, setSelectedSearchType] = useState("");
    function searchTypeChange(e) {
        setSelectedSearchType(e.target.value);
    };

    // Method for pass data for insert booking details
    async function searchBooking(event) {

        event.preventDefault();

        // Check is fields empty
        if (search !== '') {
            if (selectedSearchType !== "none") {

                if (selectedSearchType === "Event") {
                    axios.get(baseUrl + "/api/event/exist/" + search)
                        .then((res) => {
                            if (res.data === "exist") {
                                window.location.href = "/Booking/Details?eventId=" + search;
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'WARNING',
                                    text: 'Please check event id!',
                                })
                            }
                        });
                } else if (selectedSearchType === "Order") {

                    axios.get(baseUrl + "/api/orders/exist/" + search)
                        .then((res) => {
                            if (res.data === "exist") {
                                window.location.href = "/Order/Details?orderId=" + search;
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'WARNING',
                                    text: 'Please check event id!',
                                })
                            }
                        });

                } else if (selectedSearchType === "Graphic Design") {
                    axios.get(baseUrl + "/api/graphicdesign/exist/" + search)
                        .then((res) => {
                            if (res.data === "exist") {
                                window.location.href = "/GraphicDesigner/GraphicDesignerDetails?graphicId=" + search;
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'WARNING',
                                    text: 'Please check graphic id!',
                                })
                            }
                        });
                }



            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'WARNING',
                    text: 'Please select search type!',
                })

            }

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: 'Search fields empty!',
            })
        }
    }

    return (
        <div className="App text-center">
            <NavbarComponent />

            <div className="div-h100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>SEARCH FOR YOUR PURPOSE</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Searching By Id</label>
                            <input type="text" className="form-control" placeholder="Search By Id"
                                onChange={(e) => setSearch(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Type</label>
                            <select className="form-control" onChange={searchTypeChange}>
                                <option value="none" selected>Select Search Type</option>
                                <option value="Event">Event</option>
                                <option value="Order">Order</option>
                                <option value="Graphic Design">Graphic Design</option>
                            </select>
                        </div>

                        <input onClick={searchBooking} type="button" value="Search" className="btn btn-success mr-1" />

                    </form>
                </div>
            </div>

            <Footer />

        </div>

    );
}

export default Search;