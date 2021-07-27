import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [input, setinput] = useState({
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
    const { email, password } = input
    try {
      let res = await login({ email, password });
      if (res.data) {
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        if (res.data.invalid === true) {
          setmsg(res.data.msg)
          return null;
        }
        else {
          console.log('login res-->',res.data)
          history.push("/dashboard");
        }
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-primary p-5 text-center">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
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

export default Login;