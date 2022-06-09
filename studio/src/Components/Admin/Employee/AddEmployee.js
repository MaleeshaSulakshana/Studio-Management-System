import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function AddEmployees() {

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

    // Set for fields data
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");

    const [selectedEmployeeType, setSelectedEmployeeType] = useState("");
    function serviceEmployeeTypeChange(e) {
        setSelectedEmployeeType(e.target.value);
    };

    async function newEmployee(event) {

        event.preventDefault();

        // Check is fields empty
        if (id !== '' && name !== '' && number !== '' && address !== '' && qualifications !== ''
            && email !== '' && psw !== '' && selectedEmployeeType !== 'none') {

            // Validate email
            if (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {

                // Validate mobile number
                if (!isNaN(+number) && number.length === 10) {

                    const details = {
                        id: id,
                        name: name,
                        number: number,
                        address: address,
                        qualifications: qualifications,
                        email: email,
                        psw: psw,
                        type: selectedEmployeeType
                    };

                    const res = axios.post(baseUrl + "/api/employees", details)
                        .then((res) => {
                            if (res != null) {
                                Swal.fire({
                                    icon: "success",
                                    title: 'Success...',
                                    text: "Employee added successful!",
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

    return (
        <div className="App text-center">
            <AdminNavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>ADD EMPLOYEE</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Employee Id</label>
                            <input type="text" className="form-control" placeholder="Employee Id"
                                onChange={(e) => setId(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Employee Name</label>
                            <input type="text" className="form-control" placeholder="Employee Name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="phone" className="form-control" placeholder="Phone Number"
                                onChange={(e) => setNumber(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Address</label>
                            <textarea className="form-control" rows="3" placeholder="Address"
                                onChange={(e) => setAddress(e.target.value)}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Qualifications</label>
                            <textarea className="form-control" rows="3" placeholder="Qualifications"
                                onChange={(e) => setQualifications(e.target.value)}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"
                                onChange={(e) => setPsw(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Employee Type</label>
                            <select className="form-control" onChange={serviceEmployeeTypeChange}>
                                <option value="none" selected>Select Service Type</option>
                                <option value="Admin">Admin</option>
                                <option value="Video Grapher">Video Grapher</option>
                                <option value="Photo Grapher">Photo Grapher</option>
                                <option value="Graphic Designer">Graphic Designer</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        <input onClick={newEmployee} type="submit" value="Add Employee" className="btn btn-primary" />

                    </form>
                </div>
            </div>
            <Footer />

        </div>

    );
}

export default AddEmployees;
