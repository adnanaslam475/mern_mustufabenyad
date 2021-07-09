import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from 'react-router-dom'
import RegisterForm from "../components/RegisterForm";
import axios from "axios";

const Register = () => {
  const history = useHistory();
  const [input, setinput] = useState({
    name: '',
    email: '', password: ''
  })
  const [msg, setmsg] = useState('')


  const inputhandler = e => {
    setinput({
      ...input,
      [e.target.name || e.target.id]: e.target.value
    })
    setmsg('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name,
        email,
        password, } = input;
      const res = await axios.post(`http://localhost:8000/api/register`, {
        name,
        email,
        password,
      });
      res.data.ok == false && setmsg(res.data.msg);
      if (res.data.ok == true) {
        history.push('/login')
        toast.success(res.data.msg)
      };
    } catch (err) {
      console.log('err--->', err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid bg-primary p-5 text-center">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              handleSubmit={handleSubmit}
              input={input}
              msg={msg}
              inputhandler={inputhandler}
            />

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;