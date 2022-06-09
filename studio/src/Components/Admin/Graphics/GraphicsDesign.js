import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../Footer';

const baseUrl = process.env.REACT_APP_API_URL;

function GraphicsDesign() {

    const isPosition = sessionStorage.getItem("position") !== null;
    const isUserId = sessionStorage.getItem("userId") !== null;
    if (isUserId) {
        if (isPosition) {

            if (sessionStorage.getItem("position") !== "Graphic Designer") {
                window.location.href = "/Login";
            }

        }
    } else {
        window.location.href = "/Login";
    }

    const [graphics, setGraphics] = useState([]);

    // State for filter
    const [filterGraphics, setFilterGraphics] = useState([]);

    useEffect(async () => {
        axios.get(baseUrl + "/api/graphicdesign")
            .then((res) => {
                setGraphics(res.data);
                setFilterGraphics(res.data);
            });
    }, []);

    // For search
    function searchValue(event) {
        const val = event.target.value;
        const filteredItems = graphics.filter((value) => {
            return (value.type.includes(val))
        });
        setFilterGraphics(filteredItems);
    }

    // For search
    function searchStatus(event) {
        const val = event.target.value;
        const filteredItems = graphics.filter((value) => {
            return (value.status.includes(val))
        });
        setFilterGraphics(filteredItems);
    }

    // For search
    function searchClient(event) {
        const val = event.target.value;
        const filteredItems = graphics.filter((value) => {
            return (value.name.includes(val))
        });
        setFilterGraphics(filteredItems);
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

            <div className="container mt-5 div-h100 align-items-center justify-content-center">

                <div className="p-3 bg-dark text-white mb-3">
                    <h3 className="lead text-uppercase">Graphic Designs</h3>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <input onChange={searchClient} type="text" className="form-control align-left w-25 p-3" placeholder="Search" />

                    <select onClick={searchStatus} className="form-control w-25">
                        <option value="" selected>All</option>
                        <option value="pending">Pending</option>
                        <option value="complete">Complete</option>
                    </select>

                    <select onClick={searchValue} className="form-control w-25">
                        <option value="" selected>All</option>
                        <option value="edit">Photo Editing</option>
                        <option value="logo">Logo Design</option>
                    </select>

                    <button className="btn btn-secondary" onClick={logout}>LOGOUT</button>
                </div>

                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Status</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            filterGraphics.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.status}</td>
                                        <td>{item.name}</td>
                                        <td>{item.number}</td>
                                        <td>
                                            <button className="btn btn-primary"
                                                onClick={event =>
                                                    window.location.href = '/GraphicsDesign/GraphicsDesignDetails?graphicID=' + item.id}>
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

            <Footer />
        </div>

    );
}

export default GraphicsDesign;
