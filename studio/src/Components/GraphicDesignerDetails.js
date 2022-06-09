import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function GraphicDesignerDetails() {

    // Get url params
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let graphicId = params.get('graphicId');

    // Set for fields data
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [details, setDetails] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/graphicdesign/" + graphicId)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setNumber(res.data.number);
                setDetails(res.data.description);
            });
    }, []);

    // Method for update graphic
    async function updateGraphic(event) {

        event.preventDefault();

        // Check is fields empty
        if (name !== '' && details !== '' && number !== '') {

            // Validate mobile number
            if (!isNaN(+number) && number.length === 10) {

                const graphicDetails = {
                    name: name,
                    description: details,
                    number: number
                };

                axios.put(baseUrl + "/api/graphicdesign/" + graphicId, graphicDetails)
                    .then((res) => {
                        if (res != null) {
                            Swal.fire({
                                icon: "success",
                                title: 'Success...',
                                text: "Graphic Details update successful!",
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
                text: 'Fields are empty!',
            })
        }

    };

    // Method for remove graphic
    async function removeGraphic(event) {

        event.preventDefault();

        axios.delete(baseUrl + "/api/graphicdesign/" + graphicId)
            .then((res) => {
                if (res != null) {
                    Swal.fire({
                        icon: "success",
                        title: 'Success...',
                        text: "Graphic remove successful!",
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
                    <h4>GRAPHIC DESIGN DETAILS</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Graphic Id</label>
                            <input type="text" className="form-control" placeholder="Graphic Id" value={id}
                                onChange={(e) => setId(e.target.value)} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="phone" className="form-control" placeholder="Phone Number" value={number}
                                onChange={(e) => setNumber(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Other Details</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Other Details" value={details}
                                onChange={(e) => setDetails(e.target.value)}></textarea>
                        </div>

                        <input onClick={updateGraphic} type="submit" value="Update Graphic Details" className="btn btn-secondary mr-1" />
                        <input onClick={removeGraphic} type="button" value="Remove Graphic" className="btn btn-danger" />

                    </form>
                </div>
            </div>

            <Footer />

        </div>

    );
}

export default GraphicDesignerDetails;
