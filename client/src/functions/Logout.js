import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {UserContext} from '../App'

const Logout = async () => {
    const {state , dispatch} = useContext(UserContext)
    
    const navigate = useNavigate()

    try{
        const request = await fetch('http://localhost:5000/logout' , {
            method : "GET",
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        console.log(request)

        const res = await request.json();
        console.log(res)
    
        dispatch({type : "USER" , payload : false})
        toast.success(res.message)            
        navigate('/login')
        
    }catch(err){
        console.log(err)
    }


    // useEffect(()=>{

    //     doLogout()
    // },[])

    // return(
    //     <div>
    //         Hello This is Logout
    //     </div>
    // )
}

export default Logout