import React, { useState } from "react";
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from "axios";

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function Login() {
    const user = { email, password };
    try {
      setLoading(true);
      const { data } = await axios.post('/api/users/login', user);
      setLoading(false);
      //now navidate the uuse into home screen 
      localStorage.setItem('currentUser', JSON.stringify(data));//we use stringify to convert objects to string bcz local storage allows to store string only
      window.location.href = '/home';
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Invalid credentials" />}
          <div className="bs p-4 shadow-lg">
            <h2>Login</h2>
            <input type="email" className="form-control mt-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="form-control mt-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary mt-3 w-100" onClick={Login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
