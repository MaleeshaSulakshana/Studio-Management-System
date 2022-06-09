import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function EmployeeDetails() {

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
    let empID = params.get('empID');

    // Set for fields data
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [email, setEmail] = useState("");

    useEffect(async () => {
        const res = axios.get(baseUrl + "/api/employees/" + empID)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setNumber(res.data.number);
                setAddress(res.data.address);
                setQualifications(res.data.qualifications);
                setEmail(res.data.email);
            });
    }, []);

    async function updateEmployee(event) {

        event.preventDefault();

        // Check is fields empty
        if (id !== '' && name !== '' && number !== '' && address !== '' && qualifications !== ''
            && email !== '') {

            // Validate email
            if (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {

                // Validate mobile number
                if (!isNaN(+number) && number.length === 10) {

                    const details = {
                        name: name,
                        number: number,
                        address: address,
                        qualifications: qualifications,
                        email: email
                    };

                    const res = axios.put(baseUrl + "/api/employees/" + empID, details)
                        .then((res) => {
                            if (res != null) {
                                Swal.fire({
                                    icon: "success",
                                    title: 'Success...',
                                    text: "Employee details update successful!",
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

    async function removeEmployee(event) {

        event.preventDefault();

        axios.delete(baseUrl + "/api/employees/" + empID)
            .then((res) => {
                if (res != null) {
                    Swal.fire({
                        icon: "success",
                        title: 'Success...',
                        text: "Employee details remove successful!",
                    })

                    window.location.href = '/Admin/Employees';
                }
            });
    }

    return (
        <div className="App text-center">
            <AdminNavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>EMPLOYEE DETAILS</h4>
                    <form className="form">
                        <div className="mb-3">
                            <label>Employee Id</label>
                            <input type="text" value={id} className="form-control" placeholder="Employee Id"
                                onChange={(e) => setId(e.target.value)} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Employee Name</label>
                            <input type="text" value={name} className="form-control" placeholder="Employee Name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input type="phone" value={number} className="form-control" placeholder="Phone Number"
                                onChange={(e) => setNumber(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" value={email} className="form-control" placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Address</label>
                            <textarea className="form-control" value={address} rows="3" placeholder="Address"
                                onChange={(e) => setAddress(e.target.value)}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Qualifications</label>
                            <textarea className="form-control" value={qualifications} rows="3" placeholder="Qualifications"
                                onChange={(e) => setQualifications(e.target.value)}></textarea>
                        </div>

                        <input onClick={updateEmployee} type="button" value="Update Employee Details" className="btn btn-secondary mr-1" />
                        <input onClick={removeEmployee} type="button" value="Remove Employee" className="btn btn-danger" />

                    </form>
                </div>
            </div>
            <Footer />

        </div>

    );
}

export default EmployeeDetails;
