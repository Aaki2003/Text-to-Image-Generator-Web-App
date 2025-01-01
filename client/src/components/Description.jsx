import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react";


const Description = () => {
    // justify centre for horizontally centre the element 
    // items centre for vertically centre the element
  return (
    
        <motion.div 
         initial={{opacity:0.2 , y:100}}
         transition={{duration: 1}}
         whileInView={{opacity: 1 , y:0}}
         viewport={{once: false}}
        className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
            <p className='text-gray-500 mb-8'> Turn your imaginations into visuals</p>

            <div className='flex flex-col gap-5 md:flex-row md:gap-12 items-center justify-centre'>
                <img src={assets.sample_img_1} alt=''/>
                <div>
                    <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-powered Text to Image Generator</h2>
                    <p className='text-gray-600 mb-4'>
                        Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals and unique images , our tools transfrom text into eye catching images.Imagine it describe it and watch it come to reality.
                    </p>
                    <p className='text-gray-600 mb-4'>
                        Simply type text in prompt and our cutting edge AI will generate high quality images in seconds. From product visuals to high quality portraits 
                    </p>
                </div>
            </div>
        </motion.div>
  )
}

export default Description