import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';

import '../Css/Items.css';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function DecorativeItems() {

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
            return (value.name.includes(val))
        });
        setFilterItems(filteredItems);
    }

    return (

        <div className="text-center">
            <NavbarComponent />

            <div className="container h-100 align-items-center pt-3 justify-content-center">

                <div className="shop-items">

                    <div className="p-3 bg-dark text-white d-flex justify-content-between">
                        <input onChange={searchValue} type="text"
                            className="form-control align-left w-25 p-3" placeholder="Search Item" />
                        <h3 className="lead text-uppercase">Decorative Items</h3>
                        <a href="/Cart" className="btn btn-secondary align-right w-25 p-1">Your Cart</a>
                    </div>

                    <div className="container">
                        <div className="row bg-white">


                            {
                                filterItems.map((item, index) => {

                                    {
                                        if (item.type == "Decorative Items") {
                                            return (


                                                <div key={index} className="col-md-3 col-sm-6">
                                                    <div className="item">
                                                        <img className="img-responsive" src={item.image} alt="" />
                                                        <div className="item-dtls">
                                                            <p className="lead"><a href="#">{item.name}</a></p>
                                                            <span className="h6 lead">Rs. {item.price}</span>
                                                        </div>
                                                        <div className="ecom bg-dark">
                                                            <a className="btn"
                                                                onClick={event =>
                                                                    window.location.href = '/Order/ProductDetails?itemID=' + item.id}>
                                                                View Item
                                                            </a>

                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        }
                                    }

                                })
                            }

                        </div>

                    </div>
                </div>

            </div >

            <Footer />

        </div >



    );
}

export default DecorativeItems;
