import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import $ from "jquery";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const baseUrl = process.env.REACT_APP_API_URL;

function TokenDetails() {

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
    let tokenID = params.get('tokenID');

    // Set for fields data
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setQty] = useState("");
    const [email, setEmail] = useState("");
    const [inquiry, setInquiry] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/token/" + tokenID)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setQty(res.data.number);
                setEmail(res.data.email);
                setInquiry(res.data.inquiry);
            });
    }, []);

    return (
        <div className="App text-center">
            <AdminNavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>TOKEN DETAILS</h4>
                    <form className="form">

                        <div className="mb-3">
                            <label>Token Id</label>
                            <input type="text" className="form-control" placeholder="Token Id" value={id}
                                disabled />
                        </div>

                        <div className="mb-3">
                            <label>Client Name</label>
                            <input type="text" className="form-control" placeholder="Client Name" value={name}
                                disabled />
                        </div>

                        <div className="mb-3">
                            <label>Number</label>
                            <input type="text" min="0" className="form-control" placeholder="Number" value={number}
                                disabled />
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Email" value={email}
                                disabled></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Inquiry</label>
                            <input type="text" min="0" className="form-control" placeholder="Inquiry" value={inquiry}
                                disabled />
                        </div>

                    </form>
                </div>
            </div >
            <Footer />

        </div >

    );
}

export default TokenDetails;
