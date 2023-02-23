import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {UserContext} from '../App'

const Logout = () => {
    const {state , dispatch} = useContext(UserContext)

    const navigate = useNavigate()

    // Using Promises 

    useEffect(()=>{

        fetch('https://boisterous-mochi-ee786e.netlify.app/.netlify/functions/server/logout' , {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then((res)=> {
            if(res.status !== 200){
                throw new Error(res)
            }

            dispatch({type : "USER" , payload : false})
            navigate('/login')
            return res.json()
            
        }).then((res)=>{
            toast.success(res.message)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

  return (
    <div>Hello Logout</div>
  )
}

export default Logout