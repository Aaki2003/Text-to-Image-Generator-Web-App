import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import {useNavigate}  from "react-router-dom"

const Header = () => {
  const { user , setShowLogin } = useContext(AppContext);
  const navigate = useNavigate()
  const onClickHandler = () =>{
    if(user){
      navigate('/result')
    }else{
      setShowLogin(true)
    }
  }
  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p> Best text to image generator</p>
        <img src={assets.star_icon} />
      </motion.div>

      <motion.h1 className="text-4xl max-w-[500px] sm:text-7xl sm:max-w-[600px]mx-auto mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        Turn text to <span className="text-blue-800">images</span> in seconds
      </motion.h1>

      <p className="text-center max-w-xl max-auto mt-5">
        Unleash your creativity with AI . Turn your Imagination into visual art
        in seconds - just type and watch the magic happen
      </p>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={onClickHandler}
        className="flex items-center gap-2 bg-black rounded-full sm:text-lg text-white mt-8 px-12 py-2.5 hover:scale-105 transition-all "
      >
        Generate Image
        <img src={assets.star_group} className="h-6" />
      </motion.button>

      <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{ delay: 1, duration: 1 }}
      className="flex flex-wrap gap-3 justify-center mt-16">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <img
              className="max-sm:w-10 rounded hover:scale-105 transition-all duration-200"
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              width={70}
            />
          ))}
      </motion.div>

      <motion.p className="mt-2 text-neutral-600"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{ delay: 1.2, duration: 0.8 }}
      > Generated Images from Imagify</motion.p>
    </motion.div>
  );
};

export default Header;
