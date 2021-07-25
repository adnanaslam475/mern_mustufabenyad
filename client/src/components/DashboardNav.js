import React from "react";
import { Link } from 'react-router-dom';


const DashboardNav = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          className={'nav-link ${active === "/dashboard" && "active"}'}
          to="/payment">
          Payment
        </Link>
        <Link
          className={'nav-link ${active === "/dashboard" && "active"}'}
          to="/dashboard">
          Your Bookings
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={'nav-link ${active === "/dashboard/seller" && "active"}'}
          className={'nav-link'}
          to="/dashboard/seller">
          Your Hotels
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;