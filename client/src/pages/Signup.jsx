import React from 'react'
import '../stylesheets/login.css'
import { useState } from 'react'
import axios from 'axios'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Signup = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

    const handleSignup=async(e)=>{
        e.preventDefault()
        if(!name || !email || !password){
            toast.error("Fill all the details!")
            return
        }
                
        await axios.post('https://boardit.onrender.com/api/signup',{name,email,password})
        .then(res=>{
            console.log(res.data.message)
            toast.success(res.data.message)
            navigate('/home')
        })
        .catch(err=>{
            console.log(err)
        })
    }

  return (
    <div className='loginCont'>
       <div className='login-left'>
        {/* <img src='https://img.freepik.com/free-vector/scrapbook-vision-board-template-design_742173-28883.jpg?ga=GA1.1.1895877315.1729158490&semt=ais_hybrid&w=740' width="100%" height="100%"/> */}
        <p><span style={{color:"white"}}>_Board.It</span> <br/>BEFORE YOU FORGET IT</p>
      </div>
      <div className='login-right'>
        <div className='login-right-cont'>
            <p className='loginNavigate' onClick={()=>navigate('/')}><FaArrowLeft/></p>
            <h1>Signup</h1>
            <form className='login-form'>
                <div>
                    <label>Name:</label>
                    <input type='text' placeholder='username' value={name} onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
               
                <p>Already registered? <a href='/login'>Click here to login!</a></p>
                <button type='submit' onClick={handleSignup} >signUp</button>
            </form>
        </div>
        
      </div>
    </div>
  )
}

export default Signup
