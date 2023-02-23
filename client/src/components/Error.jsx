import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <div>
        <div className='grid place-items-center'>
            <div className='text-5xl font-bold'>
                Error 404 !
            </div>
            <NavLink to='/' className='bg-sky-600 text-white rounded-lg p-2 px-3 mt-4'>Go to Home</NavLink>
        </div>
    </div>
  )
}

export default Error