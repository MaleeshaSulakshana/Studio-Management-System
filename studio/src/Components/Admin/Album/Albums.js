import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../Footer';
import AdminNavbarComponent from '../AdminNavbarComponent';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

function Albums() {

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

    const [albums, setAlbums] = useState([]);

    // State for filter
    const [filterAlbums, setFilterAlbums] = useState([]);

    useEffect(async () => {
        axios.get(baseUrl + "/api/album")
            .then((res) => {
                setAlbums(res.data);
                setFilterAlbums(res.data);
            });
    }, []);

    // For search
    function searchValue(event) {
        const val = event.target.value;
        const filteredItems = albums.filter((value) => {
            return (value.title.includes(val))
        });
        setFilterAlbums(filteredItems);
    }

    return (
        <div>
            <AdminNavbarComponent />

            <div className="container mt-5 div-h100 align-items-center justify-content-center">

                <div className="p-3 bg-dark text-white mb-3">
                    <h3 className="lead text-uppercase">Albums</h3>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <input onChange={searchValue} type="text" className="form-control align-left w-25 p-3" placeholder="Search Album" />
                    <a href="/Admin/Albums/AddAlbum" className="btn btn-secondary align-right w-25 p-1">Add New Album</a>
                </div>

                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Albums Id</th>
                            <th scope="col">Albums Title</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            filterAlbums.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.title}</td>
                                        <td>
                                            <button className="btn btn-primary"
                                                onClick={event =>
                                                    window.location.href = '/Admin/Albums/AlbumDetails?albumID=' + item.id}>
                                                View
                                            </button>
                                            <button className="btn btn-secondary ml-2"
                                                onClick={event =>
                                                    window.location.href = '/Admin/Albums/ViewComments?albumID=' + item.id}>
                                                View Comments
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

export default Albums;
