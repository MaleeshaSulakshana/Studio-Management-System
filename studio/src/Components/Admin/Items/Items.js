import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function Items() {

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

    const [items, setItems] = useState([]);

    // State for filter
    const [filterItems, setFilterItems] = useState([]);

    useEffect(async () => {
        axios.get(baseUrl + "/api/items")
            .then((res) => {
                setItems(res.data);
                setFilterItems(res.data);
            });
    }, []);

    // For search
    function searchValue(event) {
        const val = event.target.value;
        const filteredItems = items.filter((value) => {
            return (value.type.includes(val))
        });
        setFilterItems(filteredItems);
    }

    return (
        <div>
            <AdminNavbarComponent />

            <div className="container mt-5 div-h100 align-items-center justify-content-center">

                <div className="p-3 bg-dark text-white mb-3">
                    <h3 className="lead text-uppercase">Items</h3>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <select onClick={searchValue} className="form-control w-25">
                        <option value='' selected>All</option>
                        <option value="Decorative Items">Decorative Items</option>
                        <option value="Personalized Items">Personalized Items</option>
                    </select>

                    <a href="/Admin/Items/AddItem" className="btn btn-secondary align-right w-25 p-1">Add New Item</a>
                </div>

                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Item Id</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Available Qty</th>
                            <th scope="col">Price Per Item</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            filterItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <button className="btn btn-primary"
                                                onClick={event =>
                                                    window.location.href = '/Admin/Items/ItemDetails?itemID=' + item.id}>
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

export default Items;
