import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './Authstyle.css';
import AuthService from '../service/Authservice';
import toast from 'react-hot-toast';

const Register = () => {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const[ username,setusername]=useState('');
    const navigate=useNavigate();

    const RegisterHandler=async(e)=>{
      e.preventDefault();
      try {
      const data = { email, password, username};
      const res = await AuthService.registerUser(data);
      toast.success(res.data.message);
      navigate('/login');
      console.log(res.data);
    } catch (error) {
      toast.error("something went wrong!");
      console.log(error);
    }
    }
   return (
    <div className='form-container'>
      <div className='form'>
        <div className='mb-3'>
          <i className='fa-solid fa-circle-user'></i>
        </div>
         <div className='mb-3'>
          <input type="text" className='form-control' placeholder='enter username' value={username}
           onChange={(e)=>setusername(e.target.value)}/>
        </div>
        <div className='mb-3'>
          <input type="email" className='form-control' placeholder='enter email' value={email}
           onChange={(e)=>setemail(e.target.value)}/>
        </div>
         <div className='mb-3'>
          <input 
    type="password" 
    className='form-control' 
    placeholder='enter password'
    value={password}
    onChange={(e)=>setpassword(e.target.value)}
  />
         
            <p> Already register😊 then
              <Link to='/login'>  Login</Link>
            </p>
            <button type='submit' className='login-btn' onClick={RegisterHandler}>Register</button>
           
          </div>
        </div>
      </div>
     

  )
}

export default Register
