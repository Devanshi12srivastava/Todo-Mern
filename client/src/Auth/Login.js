import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './Authstyle.css';
import AuthService from '../service/Authservice';
import toast from 'react-hot-toast';

const Login = () => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate=useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const res = await AuthService.loginUser(data);
      toast.success(res.data.message);
      navigate('/home');
      localStorage.setItem("todoapp",JSON.stringify(res.data))
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
          <input
            type="email"
            className='form-control'
            placeholder='enter email'
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <input
            type="password"
            className='form-control'
            placeholder='enter password'
            value={password}               // ✅ Controlled input
            onChange={(e) => setpassword(e.target.value)}  // ✅ Update state
          />
          <div className='form-bottom'>
            <p> not a user? please
              <Link to='/register'> Register</Link>
            </p>
            <button type='submit' className='login-btn' onClick={loginHandler}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
