import React,{useState,useEffect} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import './Navbar.css';
import toast from 'react-hot-toast';

const Navbar = () => {
const[username,setusername]=useState("");
const navigate=useNavigate()

const logoutHandler=()=>{
  localStorage.removeItem("todoapp");
  toast.success("logout succesfully");
  navigate('/login')
}

useEffect(()=>{
  const userData=JSON.parse(localStorage.getItem('todoapp'));
  console.log("userData=="+userData && userData.user.username);
  setusername(userData && userData.user.username)
},[]);

  return (
<div className="navbar">
  <div className="nav">

    {/* Left: Logout */}
    <div className="nav-left">
      <button title="Logout" onClick={logoutHandler} className="logout-btn">
        <i className="fa-solid fa-power-off"></i>
      </button>
    </div>

    {/* Middle: Links */}
    <div className="nav-center">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/todolist">Todolist</Link></li>
      </ul>
    </div>

    {/* Right: Username */}
    <div className="nav-right">
      <p className="user">Welcome {username}</p>
    </div>

  </div>
</div>

  )
};

export default Navbar;
