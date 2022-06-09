import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import axios from 'axios';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

const baseUrl = process.env.REACT_APP_API_URL;

function Events() {

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
            return (value.serviceType.includes(val))
        });
        setFilterEvents(filteredTokens);
    }

    function printDocument() {
        const doc = new jsPDF();

        const pdfTable = document.getElementById('tableData');
        var html = htmlToPdfmake(pdfTable.innerHTML);

        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();

    }

    return (
        <div>
            <AdminNavbarComponent />

            <div className="container mt-5 div-h100 align-items-center justify-content-center">

                <div className="p-3 bg-dark text-white mb-3">
                    <h3 className="lead text-uppercase">Events</h3>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <select onClick={searchValue} className="form-control w-25">
                        <option value="" selected>All</option>
                        <option value="Video Grapher">Video Grapher</option>
                        <option value="Photo Grapher">Photo Grapher</option>
                    </select>
                    <button className="btn btn-success" onClick={printDocument}>Download Report</button>
                </div>

                <div id="tableData">
                    <table className="table table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Event Id</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Event Type</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                filterEvents.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.number}</td>
                                            <td>{item.date}</td>
                                            <td>{item.time}</td>
                                            <td>{item.eventType}</td>
                                            <td>
                                                <button className="btn btn-primary"
                                                    onClick={event =>
                                                        window.location.href = '/Admin/Events/EventDetails?eventID=' + item.id}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    )

                                })
                            }

                        </tbody>
                    </table>

                </div>
            </div>

            <Footer />
        </div>

    );
}

export default Events;
