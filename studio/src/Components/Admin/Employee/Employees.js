import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import axios from 'axios';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

const baseUrl = process.env.REACT_APP_API_URL;

function Employees() {

    function printDocument() {
        const doc = new jsPDF();

        const pdfTable = document.getElementById('tableData');
        var html = htmlToPdfmake(pdfTable.innerHTML);

        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();

    }

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

    // For get employee details
    const [employee, setEmployee] = useState([]);

    // State for filter
    const [filterEmployee, setFilterEmployee] = useState([]);

    useEffect(async () => {
        axios.get(baseUrl + "/api/employees")
            .then((res) => {
                setEmployee(res.data);
                setFilterEmployee(res.data);
            });
    }, []);

    // For search
    function searchValue(event) {
        const val = event.target.value;
        const filteredItems = employee.filter((value) => {
            return (value.id.includes(val)
                || value.name.includes(val)
                || value.number.includes(val)
                || value.type.includes(val))
        });
        setFilterEmployee(filteredItems);
    }

    return (
        <div>
            <AdminNavbarComponent />

            <div className="container mt-5 div-h100 align-items-center justify-content-center">

                <div className="p-3 bg-dark text-white mb-3">
                    <h3 className="lead text-uppercase">Employees</h3>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <input onChange={searchValue} type="text" className="form-control align-left w-25 p-3" placeholder="Search Employee" />

                    <a href="/Admin/Employees/AddEmployee" className="btn btn-secondary align-right w-25 p-1">Add Employee</a>
                    <button className="btn btn-success" onClick={printDocument}>Download Report</button>
                </div>

                <div id="tableData">

                    <table className="table table-dark" >
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Employee Id</th>
                                <th scope="col">Employee Name</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Position</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                filterEmployee.map((emp, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{emp.id}</th>
                                            <td>{emp.name}</td>
                                            <td>{emp.number}</td>
                                            <td>{emp.type}</td>
                                            <td>
                                                <button className="btn btn-primary"
                                                    onClick={event =>
                                                        window.location.href = '/Admin/Employees/EmployeeDetails?empID=' + emp.id}>
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

export default Employees;
