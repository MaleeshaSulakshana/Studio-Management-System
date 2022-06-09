import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../firebaseConfiguration';

const baseUrl = process.env.REACT_APP_API_URL;

function AddItem() {

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
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [filename, setFilename] = useState("");
    const [desc, setDesc] = useState("");

    const [selectedType, setSelectedType] = useState("");
    function selectedTypeChange(e) {
        setSelectedType(e.target.value);
    };

    const [selectedImage, setSelectedImage] = useState([]);
    function selectedImageChange(event) {

        setSelectedImage(event[0]);
        setFilename(event[0].name);

    };

    // Method for add new item
    async function addNewItem(event) {

        event.preventDefault();

        // Check is fields empty
        if (id !== '' && name !== '' && qty !== '' && price !== ''
            && selectedType !== '' && desc !== '') {

            // Validate qty
            if (!isNaN(+qty)) {


                let storageRef = firebase.storage().ref("items/" + id + "/" + filename);
                let uploadTask = storageRef.put(selectedImage);
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                        storageRef.getDownloadURL()
                            .then(url => {

                                const details = {
                                    id: id,
                                    name: name,
                                    qty: qty,
                                    price: price,
                                    type: selectedType,
                                    desc: desc,
                                    image: url
                                };

                                axios.post(baseUrl + "/api/items", details)
                                    .then((res) => {
                                        if (res != null) {
                                            Swal.fire({
                                                icon: "success",
                                                title: 'Success...',
                                                text: "Item added successful!",
                                            })
                                            window.location.reload();
                                        }
                                    });

                            })
                    })

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

    return (
        <div className="App text-center">
            <AdminNavbarComponent />

            <div className="h-100 align-items-center d-flex justify-content-center">
                <div className="col-md-4 text-left card pt-4 pb-2 pl-3 pr-3 mt-5">
                    <h4>ADD NEW PRODUCT ITEM</h4>
                    <form className="form">

                        <div className="mb-3">
                            <label>Item Id</label>
                            <input type="text" className="form-control" placeholder="Item Id"
                                onChange={(e) => setId(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Item Name</label>
                            <input type="text" className="form-control" placeholder="Item Name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Item Qty</label>
                            <input type="number" min="0" className="form-control" placeholder="Item Qty"
                                onChange={(e) => setQty(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Price Per Item</label>
                            <input type="text" min="0" className="form-control" placeholder="Price Per Item"
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label>Item Details</label>
                            <textarea className="form-control" rows="3" id="comment" placeholder="Item Details"
                                onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Item Type</label>
                            <select className="form-control" onChange={selectedTypeChange} value={selectedType}>
                                <option value="" selected>Select Item Type</option>
                                <option value="Decorative Items">Decorative Items</option>
                                <option value="Personalized Items">Personalized Items</option>
                            </select>
                        </div>

                        <div className="mb-3 form-group files">
                            <label>Upload Product Item Image</label>
                            <input type="file" className="form-control"
                                onChange={(e) => selectedImageChange(e.target.files)} accept="image/*" />
                        </div>

                        <input onClick={addNewItem} type="button" value="Add New Item" className="btn btn-primary" />

                    </form>
                </div>
            </div >
            <Footer />

        </div >

    );
}

export default AddItem;
