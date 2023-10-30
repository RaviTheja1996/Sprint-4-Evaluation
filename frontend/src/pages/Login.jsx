import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../Redux/action';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.isAuth);

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password, dispatch);

    if (isAuth) {
      navigate("/posts");
    }

    // fetch("https://dull-ruby-crane-ring.cyclic.app/users/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify(payload)
    // }).then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     navigate("/posts");
    //   })
    //   .catch((err) => console.log(err.message));
  }

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" value={email} placeholder='Enter Email' onChange={handleChange} />
        <input type="password" name="password" value={password} placeholder='Enter Password' onChange={handleChange} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login