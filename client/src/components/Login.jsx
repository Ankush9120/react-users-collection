import React, { useContext, useState } from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {UserContext} from '../App'

const Login = () => {
  const {state,dispatch} = useContext(UserContext)

  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const navigate = useNavigate()
  
  const userLogin = async (e) =>{
    e.preventDefault()
    const res = await fetch('https://react-users-collection.onrender.com/login',{
      method : "POST" ,
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({email,password})
    })
    const data = await res.json()

    if(res.status === 201){
      // sending true value to state when login 
      dispatch({type : "USER" , payload:true})
      
      navigate('/') 
      toast.success(data.message)

    }else{
      toast.error(data.message)
    }
  }

  return (
    <div>
      <form onSubmit={userLogin} method="POST" className="loginBox">
        <header className="text-xl mb-3 font-semibold">Login</header>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} name="email" type="text" placeholder="Enter Email" />

        <input value={password} onChange={(e)=>setPassword(e.target.value)} name="password" type="password" placeholder="Enter Password" />

        <button type="login" className="submitBtn text-white text-sm p-2 px-4 rounded-sm shadow-md">Login</button>

        <NavLink to='/register' className='block text-sm mt-4 hover:underline'>Don't have account ? Click here</NavLink>
      </form>
    </div>
  )
}

export default Login