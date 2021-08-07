import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import DashboardNav from "../components/DashboardNav"

const Dashboard = () => {
    const [hotels, setHotels] = useState(null);
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('auth')
        const t = JSON.parse(token)
        if (!t?.token) {
            history.push('/login')
        }
        axios.get(`/api/hotels`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setHotels(res.data)
        }).catch(e => {
            console.log(e)
        })
    }, [])



    return (
        <>
            <div className="container-fluid bg-primary p-5">
                <h1>Dashboard</h1>
            </div>
            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            <div className="container-fluid">

                <p>Show all bookings and button to browse hotels</p>
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Bookings</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to="/hotels/new" className="bnt bnt-primary">
                            <button className="btn btn-primary mb-3">Add Listing</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;