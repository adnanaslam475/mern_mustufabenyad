import React from "react";


const LoginForm = ({
  handleSubmit,
  inputhandler,
  msg,
  input
}) => {
  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="type email..."
          name='email'
          id='email'
          value={input.email}
          onChange={inputhandler}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name='password'
          id='password'
          placeholder="password"
          value={input.password}
          onChange={inputhandler}
        />
      </div>
      <p style={{ color: 'red' }}>{msg}</p>
      <button disabled={!input.email || !input.password}
        className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}

export default LoginForm;