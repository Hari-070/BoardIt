import React, { useEffect } from 'react'
import '../stylesheets/login.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const {auth,setAuth,setName }=useAuth()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const navigate=useNavigate()

    // useEffect(()=>{
    //   setTimeout(()=>{
    //     if(auth.token){
    //     navigate('/home')
    //   }
    //   },2000)
    // },[auth.token])

    const handleLogin=async(e)=>{
        e.preventDefault()
        if( !email || !password){
            toast.error("Fill all the details!")
            return
        }
        await axios.post('https://boardit.onrender.com/api/login',{email,password})
        .then(res=>{
            localStorage.setItem('token', res.data.token);
            // console.log(res.data.message)
            toast.success(res.data.message)
            navigate('/home')
            // setTimeout(()=>(
            //   navigate('/home')
            // ),2000)
            localStorage.setItem('userName',res.data.username);
            setAuth({...prev,token:localStorage.getItem('token')})
            setName(localStorage.getItem('userName'))
            
        })
        .catch(err=>{
            console.log(err)
            toast.error(err.response.data.message)
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
            <h1>Login</h1>
            <form className='login-form'>
                <div>
                    <label>Email:</label>
                    <input type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                
                <p>dont have an acount <a href='/signup'>Click here to signup!</a></p>
                <button onClick={handleLogin} >Login</button>
            </form>
        </div>
        
      </div>
    </div>
  )
}

export default Login
