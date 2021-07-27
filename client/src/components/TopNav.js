import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { token } from 'morgan';


const TopNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let [tokenlocal, settokenlocal] = useState(null)
  const user = useSelector(s => s);
  const [token, settoken] = useState('')



  useEffect(() => {
    const token = localStorage.getItem('auth')
    const t = JSON.parse(token)
    settokenlocal(t?.token || user.token)
  }, [user])



  const logout = () => {
    localStorage.clear();
    settokenlocal(null)
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (

    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home
      </Link>

      <div className="nav bg-light d-flex justify-content-between">
        {tokenlocal && <Link className="nav-link" to="/my-hotels">
          My Hotels
        </Link>}
        {tokenlocal && <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>}
        <div className="nav bg-light d-flex justify-content-between">
          {!tokenlocal ? <div style={{ display: 'flex' }}>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </div> :
            <Link className="nav-link" onClick={logout} to="/login">
              Logout
            </Link>}
          <Link className="nav-link" to="/help">
            Help
          </Link>
        </div>
      </div>
    </div>

  );
};

export default TopNav;