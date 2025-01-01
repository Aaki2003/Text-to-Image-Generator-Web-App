import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

        const {user , setShowLogin , credit , logout} = useContext(AppContext)
        const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between py-2'>
        <Link to='/'>
        <img src={assets.logo} alt='' className='w-28 sm:w-32 lg:w-40'/>
        </Link>

        <div>
            {user ? 
            //user is logged in
            <div className='flex items-center gap-2 sm:gap-3'>
                <button className='flex items-center bg-blue-200 px-4 sm:px-6 py-1.5 rounded-full hover:scale-105 transition-all duration-200'>
                    <img className="w-5" src ={assets.credit_star} alt = ""/>
                    <p className='text-xs sm:text-sm font-bold text-gray-700'>Credits left : {credit}</p>
                </button>
                <p className='text-gray-700 max-sm:hidden pl-4 hover:scale-105 transition-all duration-700'>Hi {user.name}</p>
                <div className='relative group hover:scale-105 duration-700'>
                    <img src = {assets.profile_icon} className='w-10 hover:scale-105 drop-shadow '/>
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                            <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>:
            //user is logged out
            <div className='flex items-center gap-2 sm:gap-5'>
                <p className='cursor-pointer hover:scale-105 transition-colors' onClick={()=>navigate('/buy')}> Pricing</p>
                <button className='bg-zinc-800 text-white px-7 py-1 sm:px-10 text-sm rounded-full hover:scale-105 transition-all duration-200' onClick={()=>(setShowLogin(true))}>Login</button>
            </div>
            }
            
           
            
        </div>
    </div>
  )
}

export default Navbar