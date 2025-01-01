import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='flex items-center gap-2 justify-between mt-15 '>
        <img src={assets.logo} width={150} alt=''/>
        <p className='flex-1 border-gray-600 text-sm text-gray-500 pl-4 mt-2 max-sm:hidden'>All rights reserved</p>
        <div className='flex gap-2.5'> 
            <img src={assets.facebook_icon} alt='/' width={35}/>
            <img src={assets.twitter_icon} alt='/' width={35}/>
            <img src={assets.instagram_icon} alt='/' width={35}/>
        </div>
    </footer>
  )
}

export default Footer