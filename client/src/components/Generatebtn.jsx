import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Generatebtn = () => {
  const {user, setShowLogin  } = useContext(AppContext);
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
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }} //how many times the animation will appear for this number of times we scroll
      className="pb-16 text-center "
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        See the magic. Try Now.
      </h1>
      <button onClick={onClickHandler} className="inline-flex items-center gap-2 bg-black rounded-full sm:text-lg text-white mt-8 px-12 py-2.5 hover:scale-105 transition-all ">
        Generate Images
        <img src={assets.star_group} className="h-6" />
      </button>
    </motion.div>
  );
};

export default Generatebtn;
