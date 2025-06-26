import React from 'react'
import '../stylesheets/landing.css'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'


const Landing = () => {
    const navigate=useNavigate()

    const handleStart=()=>{
        navigate('/login')
    }
  return (
    <div>
      <div className='landingNav'>
        <nav>
            <img src={logo} alt='logo' width="100px"/>
            <div >
                <button className='land-start' onClick={handleStart}>Get Started</button>
                <button className='land-login' onClick={handleStart}>Login</button>
            </div>
        </nav>
      </div>
      <div className='landing-hero'>
        <div>
            <h1>Inspiration is scattered? Your boards shouldn't be.</h1>
            <p>Bring your vision together with BoardIt — your personal space to create and collect.</p>
            <button className='land-start' onClick={handleStart}>Get Started</button>
        </div>
        <img src='https://img.freepik.com/free-vector/elegant-wedding-mood-board-photo-collage_742173-9215.jpg?ga=GA1.1.1895877315.1729158490&semt=ais_hybrid&w=740' width="50%"/>
        {/* <img src='https://img.freepik.com/free-photo/vision-board-concept-low-angle_23-2149934492.jpg?ga=GA1.1.1895877315.1729158490&semt=ais_hybrid&w=740' width="50%"/> */}
      </div>
    </div>
  )
}

export default Landing
