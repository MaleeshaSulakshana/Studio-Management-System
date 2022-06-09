import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function GraphicDetails() {

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
    let graphicID = params.get('graphicID');

    // Set for fields data
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [design, setDesign] = useState("");
    const [status, setStatus] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/graphicdesign/" + graphicID)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setNumber(res.data.number);
                setDescription(res.data.description);
                setStatus(res.data.status);
                setDesign(res.data.design);

                if (res.data.type == "logo") {
                    setType("Logo Design");
                    document.getElementById("image").style.display = "none";
                } else {
                    setType("Photo Editing");
                    document.getElementById("design").style.display = "none";
                }

                if (res.data.status == "complete") {
                    document.getElementById("complete").style.display = "none";
                }
            });
    }, []);

    async function setUpdate(event) {

        event.preventDefault();

        const details = {
            status: "complete"
        };

        axios.put(baseUrl + "/api/graphicdesign/status/" + graphicID, details)
            .then((res) => {
                if (res != null) {
                    Swal.fire({
                        icon: "success",
                        title: 'Success...',
                        text: "Graphic design complete successful!",
                    })

                    window.location.href = '/Admin/Graphics';
                }
            });
    }

    return (
        <div className="App text-center">
            <AdminNavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mb-5 mt-5">
                    <h4 className="text-uppercase">Graphic DETAILS</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Order Id</label>
                            <input type="text" className="form-control" placeholder="Order Id" value={id}
                                disabled />
                        </div>

                        <div className="mb-3">
                            <label>Design Type</label>
                            <input type="text" className="form-control" placeholder="Design Type" value={type}
                                disabled />
                        </div>

                        <div className="mb-3" id="design">
                            <label>Design</label>
                            <input type="text" className="form-control" placeholder="Design" value={design}
                                disabled />
                        </div>

                        <div className="mb-3">
                            <label>Client Name</label>
                            <input type="text" className="form-control" placeholder="Client Name" value={name}
                                disabled />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="text" className="form-control" placeholder="Phone Number" value={number}
                                disabled />
                        </div>

                        <div className="mb-3">
                            <label>Other Details</label>
                            <textarea className="form-control" rows="3" placeholder="Other Details" value={description}
                                disabled></textarea>
                        </div>

                        <div className="mb-3">
                            <a href={design} id="image" className="form-control" download>Download Image</a>
                        </div>

                        <input onClick={setUpdate} id="complete" type="button" value="Complete" className="btn btn-success" />

                    </form>
                </div>
            </div>


            <Footer />

        </div>

    );
}

export default GraphicDetails;
