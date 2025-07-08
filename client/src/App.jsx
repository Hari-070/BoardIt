import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './pages/Landing'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Toaster from 'react-hot-toast'
import BoardPage from './pages/BoardPage'
import { MdMessage } from "react-icons/md";
import ErrorPage from './pages/ErrorPage'
// import PrivateRoute from './components/PrivateRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Toaster/> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path='/*' element={<ErrorPage/>}/>
      </Routes>
      </BrowserRouter>
      <div className='chat-bot' onClick={()=>alert("Future Implementations")}>
        <MdMessage/>
      </div>
    </>
  )
}

export default App
