import React from 'react';

import { LoadingOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe"
import { updateUserInLocalStorage } from "../actions/auth"

const StripeCallback = ({ history }) => {
    const { auth } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth && auth.token) accountStatus()
    }, [auth]);

    const accountStatus = async () => {
        try {
            const res = await getAccountStatus(auth.token)
            // console.log("USER ACCOUT STATUS ON STRIPE CALLBACK", res);
            updateUserInLocalStorage(res.data, () => {
                //updateuser in redux
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data,
                })
                // redirect user to dashboard
                window.location.href = "/dashboard/seller";
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="d-fex justify-content-center p-5">
            <LoadingOutlined className="display-1 p-5 text-danger" />
        </div>
    );
};


export default StripeCallback;