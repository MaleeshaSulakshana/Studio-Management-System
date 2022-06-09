import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import $ from "jquery";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const baseUrl = process.env.REACT_APP_API_URL;

function ItemDetails() {

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
    let itemID = params.get('itemID');

    // Set for fields data
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/items/" + itemID)
            .then((res) => {
                setId(res.data.id);
                setName(res.data.name);
                setQty(res.data.qty);
                setPrice(res.data.price);
                setDesc(res.data.desc);
            });
    }, []);

    async function updateItem(event) {

        event.preventDefault();

        // Check is fields empty
        if (id !== '' && name !== '' && qty !== '' && price !== '' && desc !== '') {

            if (!isNaN(+qty)) {

                const details = {
                    id: id,
                    name: name,
                    qty: qty,
                    price: price,
                    desc: desc
                };

                axios.put(baseUrl + "/api/items/" + itemID, details)
                    .then((res) => {
                        if (res != null) {
                            Swal.fire({
                                icon: "success",
                                title: 'Success...',
                                text: "Items details update successful!",
                            })
                            window.location.reload();
                        }
                    });

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'WARNING',
                    text: 'Please check qty!',
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

    async function removeItem(event) {

        event.preventDefault();

        axios.delete(baseUrl + "/api/items/" + itemID)
            .then((res) => {
                if (res != null) {
                    Swal.fire({
                        icon: "success",
                        title: 'Success...',
                        text: "Item details remove successful!",
                    })

                    window.location.href = '/Admin/Items';
                }
            });
    }

    return (
        <div className="App text-center">
            <AdminNavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>PRODUCT ITEM DETAILS</h4>
                    <form className="form">

                        <div className="mb-3">
                            <label>Item Id</label>
                            <input type="text" className="form-control" placeholder="Item Id" value={id}
                                onChange={(e) => setId(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Item Name</label>
                            <input type="text" className="form-control" placeholder="Item Name" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Item Qty</label>
                            <input type="text" min="0" className="form-control" placeholder="Item Qty" value={qty}
                                onChange={(e) => setQty(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Item Details</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Item Details" value={desc}
                                onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Price Per Item</label>
                            <input type="text" min="0" className="form-control" placeholder="Price Per Item" value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <input onClick={updateItem} type="button" value="Update Item Details" className="btn btn-secondary mr-1" />
                        <input onClick={removeItem} type="button" value="Remove Item" className="btn btn-danger" />

                    </form>
                </div>
            </div >
            <Footer />

        </div >

    );
}

export default ItemDetails;
