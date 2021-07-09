import React from "react";
import { allHotels } from '../actions/hotel';
import { useState, useEffect } from 'react';
import  SmallCard  from "../components/cards/SmallCard";
import { useSelector, userSelector, useStore } from "react-redux";

const Home = () => {
  const  state  = useSelector((state) => ({ ...state }));
  return (
    <div className="container-fluid h1 p-5 text-center">
      Home Page {JSON.stringify(state.user)}
    </div>
  );
};

export default Home;