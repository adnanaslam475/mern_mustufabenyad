import React from "react";

import { Link } from 'react-router-dom'
import DashboardNav from "../components/DashboardNav"

const Dashboard = () => {
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