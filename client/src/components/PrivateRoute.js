import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux' 


const PrivateRoute = ({ ...rest }) => {
    const { auth } = useSelector((state) => ({ ...state }));
    return auth && auth ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default PrivateRoute;