import React from 'react'



const RegisterForm = ({
  handleSubmit,
  input,
  inputhandler,
  msg
}) => {


  return (<form onSubmit={handleSubmit} className="mt-3">
    <div className="form-group mb-3">
      <label className="form-label">Your name</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter name"
        name='name'
        id='name'
        value={input.name}
        onChange={inputhandler}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Email address</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
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
        placeholder="Enter password"
        id='password'
        name='password'
        value={input.password}
        onChange={inputhandler}
      />
    </div>
    <p style={{ color: 'red' }} >{msg}</p>
    <button className="btn btn-primary">Submit</button>
  </form>
  )
}

export default RegisterForm;