import React, { useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import axios from "axios";


function Registerscreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [number, setNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success,setsuccess]=useState();

  async function register() {
    if (name === "" || email === "" || password === "" || cpassword === "" || number === "") {
      alert("Please fill all the fields");
    } else if (password == cpassword) {
      const user = {
        name, email, password, cpassword,number
      };
      try{
        setLoading(true)
        const result=await axios.post('api/users/register', user).data;
        setLoading(false)
        setsuccess(true)

        setName('')
        setEmail('')
        setPassword('')
        setCpassword('')
        setNumber('')
      }catch(error){
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert("Password and Confirm Password should be the same");
    }
  }

  return (
    <div>
      {loading && (<Loader/>)}
      {error && (<Error/>)}
      <div className="row justify-content-center mt-5">
      {success && (<Success message={'registration Success'}/>)}

        <div className="col-md-5 mt-5">
          
          <div className="bs p-4 shadow-lg">
            <h2>Register</h2>
            <input 
              type='text' 
              className="form-control mt-3" 
              placeholder='Name' 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type='email' 
              className="form-control mt-3" 
              placeholder='Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type='password' 
              className="form-control mt-3" 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <input 
              type='password' 
              className="form-control mt-3" 
              placeholder='Confirm Password' 
              value={cpassword} 
              onChange={(e) => setCpassword(e.target.value)}
            />
            <input 
              type='tel' 
              className="form-control mt-3" 
              placeholder='Phone Number' 
              value={number} 
              onChange={(e) => setNumber(e.target.value)}
            />
            <button 
              className="btn btn-primary mt-3 w-100" 
              onClick={register}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
