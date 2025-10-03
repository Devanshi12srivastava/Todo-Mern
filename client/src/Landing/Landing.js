import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
  return (
    <div className='hero'>
        <div className='intro-text'>
            <h1>
                <span> Schedule and maintain your task daily</span>
            </h1>
    <Link className="btn red" to='/register'>Register</Link>
    <Link className="btn blue" to='/login'>Login</Link>

        </div>
   
    </div>
  )
}

export default Landing;
