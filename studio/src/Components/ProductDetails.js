import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../Css/Items.css';

const baseUrl = process.env.REACT_APP_API_URL;

function ProductDetails() {

    // Get url params
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let itemID = params.get('itemID');

    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(1);
    const [total, setTotal] = useState("");

    const [details, setDetails] = useState("");

    useEffect(async () => {
        axios.get(baseUrl + "/api/items/" + itemID)
            .then((res) => {
                const isCart = sessionStorage.getItem("cart") !== null;
                if (isCart) {
                    let value = JSON.stringify(sessionStorage.getItem("cart"));
                    let valueJson = value.split("+");

                    var isYes = "no"
                    for (let i = 0; i < valueJson.length; i++) {
                        let itemValue = valueJson[i]
                        let replacedValue = itemValue.replace(/"/g, '');
                        let splittedValue = replacedValue.split(",");
                        let replacedSpace = splittedValue[0].replace(/ /g, '');

                        if (replacedSpace === res.data.id) {
                            isYes = "yes"
                            setQty(Number(splittedValue[3]))
                        }
                    }

                    if (isYes === "yes") {
                        document.getElementById("addToCart").style.display = "none";
                        document.getElementById("removeItem").style.display = "block";
                    } else {
                        document.getElementById("addToCart").style.display = "block";
                        document.getElementById("removeItem").style.display = "none";
                    }

                } else {
                    document.getElementById("addToCart").style.display = "block";
                    document.getElementById("removeItem").style.display = "none";
                }
                setPrice(res.data.price)
                setDetails(res.data);
                setTotal(res.data.price)

            });
    }, []);


    // Method for add to cart
    async function addToCart(event) {

        event.preventDefault();
        const isCart = sessionStorage.getItem("cart") !== null;

        if (!isCart) {
            let cartAll = [];
            cartAll.push(details.id + "," + details.name + "," +
                details.price + "," + qty + "," + document.getElementById("totalPrice").innerText)
            sessionStorage.setItem("cart", cartAll);

        } else {
            let cartAll = [];
            cartAll.push(sessionStorage.getItem("cart").toString());
            cartAll.push(' + ' + details.id + "," + details.name + "," +
                details.price + "," + qty + "," + document.getElementById("totalPrice").innerText)
            sessionStorage.setItem("cart", cartAll);
        }

        document.getElementById("addToCart").style.display = "none";
        document.getElementById("removeItem").style.display = "block";

    };

    // Method for remove items from cart
    async function removeFromCart(event) {

        event.preventDefault();
        const isCart = sessionStorage.getItem("cart") !== null;
        if (isCart) {
            let value = JSON.stringify(sessionStorage.getItem("cart"));
            let valueJson = value.split("+");

            var cartItems = []
            for (let i = 0; i < valueJson.length; i++) {
                let itemValue = valueJson[i]
                let replacedValue = itemValue.replace(/"/g, '');
                let splittedValue = replacedValue.split(",");
                let replacedSpace = splittedValue[0].replace(/ /g, '');

                if (replacedSpace !== details.id) {
                    if (i !== 0) {

                        if (cartItems.length == 0) {
                            cartItems.push(replacedSpace + "," + splittedValue[1] + "," +
                                splittedValue[2] + "," + splittedValue[3] + "," + splittedValue[4])
                        } else {
                            cartItems.push(' + ' + replacedSpace + "," + splittedValue[1] + "," +
                                splittedValue[2] + "," + splittedValue[3] + "," + splittedValue[4])
                        }

                    } else {
                        cartItems.push(replacedSpace + "," + splittedValue[1] + "," +
                            splittedValue[2] + "," + splittedValue[3] + "," + splittedValue[4])
                    }

                } else {
                    document.getElementById("addToCart").style.display = "block";
                    document.getElementById("removeItem").style.display = "none";
                }

            }

            if (cartItems.length != 0) {
                sessionStorage.setItem("cart", cartItems);
            } else {
                sessionStorage.removeItem('cart');
            }

        }

    };

    return (

        <div className="text-center">
            <NavbarComponent />

            <div className="container h-100 pt-5 mt-5">

                <div className="container card p-3 ">

                    <div className="d-flex justify-item-center">
                        <img src={details.image} className="w-50 h-100" />
                        <div className="p-3 text-center">
                            <h2 className="h3">{details.name}</h2>
                            <p className="small p-2">{details.desc}</p>
                        </div>
                    </div>

                </div>

                <div className=" bg-white rounded p-3 mt-5">

                    <div className="w-100">
                        <div className="text-center w-100">
                            <h4 className="h4 float-center">Price Per Item: Rs. {details.price}</h4>
                        </div>
                        <div className="text-center w-100">
                            <h4 className="h4 float-left">Total: Rs. <span id="totalPrice">{price * qty}</span></h4>
                        </div>
                        <div className="w-100 d-flex justify-item-center">
                            <h4 className="h4 mr-3">Qty</h4>
                            <input onChange={(e) => setQty(e.target.value)} className="float-center form-control w-25" type="number" min="1" value={qty} />
                        </div>
                        <button className="btn btn-success rounded float-right" id="addToCart"
                            onClick={addToCart}>Add to Cart</button>
                        <button className="btn btn-danger rounded float-right mr-2" id="removeItem"
                            onClick={removeFromCart}>Remove from Cart</button>
                    </div>
                </div>

            </div >

            <Footer />

        </div >



    );
}

export default ProductDetails;
