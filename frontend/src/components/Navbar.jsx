import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../Redux/action';

const Navbar = () => {
  const isAuth = useSelector((store) => store.isAuth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout(dispatch);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isAuth ? <button onClick={handleLogout}>Logout</button> : <NavLink to="/login">Login</NavLink>}
      <NavLink to="/signup">Register</NavLink>
    </div>
  )
}

export default Navbar