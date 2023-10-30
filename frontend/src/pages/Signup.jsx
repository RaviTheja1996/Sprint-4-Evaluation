import React, { useState } from 'react'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [isMarried, setIsMarried] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { username, email, gender, age, password, city, is_married: isMarried };

    fetch("https://dull-ruby-crane-ring.cyclic.app/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
  }

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "gender") {
      setGender(e.target.value);
    }
    if (e.target.name === "age") {
      setAge(+e.target.value);
    }
    if (e.target.name === "city") {
      setCity(e.target.value);
    }
    if (e.target.name === "isMarried") {
      setIsMarried(e.target.value);
    }
  }

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} placeholder='Enter Username'
          onChange={handleChange} />
        <input type="email" name="email" value={email} placeholder='Enter Email'
          onChange={handleChange} />
        <input type="password" name="password" value={password} placeholder='Enter Password'
          onChange={handleChange} autoComplete="false" />
        <input type="text" name="gender" value={gender} placeholder='Enter Gender'
          onChange={handleChange} autoComplete="false" />
        <input type="text" name="age" value={age} placeholder='Enter Age'
          onChange={handleChange} autoComplete="false" />
        <input type="text" name="city" value={city} placeholder='Enter City name'
          onChange={handleChange} autoComplete="false" />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Signup