import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {useParams} from 'react-router-dom';


function Payment() {
const location=useParams();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        productby: ''
    })

console.log( location.state)
    const handlechange = e => {
        setProduct({
            ...product,
            [e.target.name || e.target.id]: e.target.value
        })
    }

    const makePayment = token => {
        const body = {
            token,
            product
        }
        const header = {
            "Content-Type": "application/json"
        }
        return fetch(`/api/payment`, {
            method: "POST",
            headers: header,
            body: JSON.stringify(body)
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div className="mt-3 form-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name='name'
                style={{ width: '40%', margin: '2%' }}
                id='name'
                value={product.name}
                onChange={handlechange}
            />
            <input
                type="number"
                className="form-control"
                placeholder="Enter Price in $"
                name='price'
                id='price'
                style={{ width: '40%', margin: '2%' }}
                value={product.price}
                onChange={handlechange}
            />

            <StripeCheckout style={{ width: '40%', margin: '2%' }}
                stripeKey="pk_live_51IimupDmVdXnLB9ljPw79i3pDMqV73G2WU8ldNqTbhZUy4AnuBPVUfccnonzgNdpRG2dLw5REcyZRqzeAapgC4Bx00yCaGkfX9"
                token={makePayment}
                name="hotel payment" />
        </div>
    );
}
export default Payment;