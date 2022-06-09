import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../Css/Items.css';

const baseUrl = process.env.REACT_APP_API_URL;

function Cart() {

    const isCart = sessionStorage.getItem('cart') === null;
    if (isCart) {
        window.location = "/";
    }

    let total = 0;
    const [itemsDetails, setItems] = useState([]);

    useEffect(async () => {
        axios.get(baseUrl + "/api/items")
            .then((res) => {
                setItems(res.data);
            });
    }, []);

    // Method for remove all cart items
    async function clearCart(event) {

        event.preventDefault();
        sessionStorage.removeItem('cart');
        window.location = "/";
    };

    return (

        <div className="text-center">
            <NavbarComponent />
            <div className="container h-100 pt-5 mt-5">

                {
                    itemsDetails.map((item, index) => {

                        {
                            let value = JSON.stringify(sessionStorage.getItem("cart"));
                            let valueJson = value.split("+");

                            for (let i = 0; i < valueJson.length; i++) {
                                let itemValue = valueJson[i]
                                let replacedValue = itemValue.replace(/"/g, '');
                                let splittedValue = replacedValue.split(",");
                                let replacedSpace = splittedValue[0].replace(/ /g, '');

                                if (replacedSpace === item.id) {
                                    total = Number(total) + Number(splittedValue[4]);

                                    return (
                                        <div className="container card p-3 m-2">
                                            <div className="d-flex justify-item-center">
                                                <img src={item.image} className="w-25 h-50" />
                                                <div className="text-center w-100">
                                                    <div className="text-center w-100">
                                                        <h2 className="h5 float-center">{item.name}</h2>
                                                    </div>
                                                    <div className="text-center w-100">
                                                        <h2 className="h5 float-center">Rs. {splittedValue[4]}</h2>
                                                    </div>
                                                    <div className="text-center w-100">
                                                        <h2 className="h5 float-center">{splittedValue[3]} Items</h2>
                                                    </div>
                                                    <button onClick={event =>
                                                        window.location.href = '/Order/ProductDetails?itemID=' + item.id}
                                                        className="btn btn-secondary float-right">View Item</button>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                }

                            }

                        }

                    })
                }

                <h2 className="h4 text-white">Total Price - Rs. {total} + 300(Delivery Charges)</h2>
                <button className="btn btn-success m-4" onClick={event =>
                    window.location.href = '/CheckOut'}>Check Out</button>
                <button className="btn btn-secondary m-4" onClick={clearCart}>Clear Cart</button>

            </div >

            <Footer />

        </div >



    );
}

export default Cart;
