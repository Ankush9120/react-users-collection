import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {toast } from "react-toastify";

const Register = () => {
  const [userData , setUserData] = useState({name:"" ,email:"",phone:"",password:"",cpassword:""})

  const storeUser = (e)=>{
    let name , val ;
    name = e.target.name ;
    val = e.target.value ;
    setUserData({...userData , [name]:val})
  }

  const postReg = async (e)=>{
    e.preventDefault()
    const res = await fetch('https://boisterous-mochi-ee786e.netlify.app/.netlify/functions/server/register' , {
      method: "POST" ,
      headers : {
        "Content-Type" : "application/json"
      } ,
      body : JSON.stringify(userData)
    })

    const data = await res.json()
    if(res.status === 401){
      toast.error(data.message)
    }
    else{
      toast.success(data.message)
    }

  }

  return (
    <div>
      <form method="POST" onSubmit={postReg} className="registerBox">
        <header className="text-xl mb-3 font-semibold">Registration</header>
        <input value={userData.name} onChange={storeUser} name="name" type="text" placeholder="Enter Name" />
        <input value={userData.email} onChange={storeUser} name="email" type="text" placeholder="Enter Email" />
        <input value={userData.phone} onChange={storeUser} name="phone" type="tel" placeholder="Enter Phone" />
        <input value={userData.password} onChange={storeUser} name="password" type="password" placeholder="Enter Password" />
        <input value={userData.cpassword} onChange={storeUser} name="cpassword" type="password" placeholder="Confirm Password" />
        <button type="submit" className="submitBtn text-white text-sm p-2 px-4 rounded-sm shadow-md">Sign Up</button>
        <NavLink to='/login' className='block text-sm mt-4 hover:underline'>Already have account ? Click here</NavLink>
      </form>
    </div>
  );
};

export default Register;
