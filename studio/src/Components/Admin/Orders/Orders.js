import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

const baseUrl = process.env.REACT_APP_API_URL;

function Orders() {

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

    const [orders, setOrders] = useState([]);

    // State for filter
    const [filterOrders, setFilterOrders] = useState([]);

    useEffect(async () => {
        axios.get(baseUrl + "/api/orders")
            .then((res) => {
                setOrders(res.data);
                setFilterOrders(res.data);
            });
    }, []);


    // For search
    function searchStatus(event) {
        const val = event.target.value;
        const filteredItems = orders.filter((value) => {
            return (value.status.includes(val))
        });
        setFilterOrders(filteredItems);
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
                    <h3 className="lead text-uppercase">Orders</h3>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <select onClick={searchStatus} className="form-control w-25">
                        <option value="" selected>All</option>
                        <option value="Pending">Pending</option>
                        <option value="Complete">Complete</option>
                    </select>
                    <button className="btn btn-success" onClick={printDocument}>Download Report</button>

                </div>
                <div id="tableData">
                    <table className="table table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Mobile Number</th>
                                <th scope="col">Email</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                filterOrders.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.number}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <button className="btn btn-primary"
                                                    onClick={event =>
                                                        window.location.href = '/Admin/Orders/OrderDetails?orderID=' + item.id}>
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

export default Orders;
