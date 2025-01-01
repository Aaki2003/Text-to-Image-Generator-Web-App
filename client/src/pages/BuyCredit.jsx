import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

const BuyCredit = () => {
  const { user , backendURL , loadCreditData , token , setShowLogin  } = useContext(AppContext);

  const navigate = useNavigate()

  const initpay = async (order)=>{

    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency:order.currency,
      name:'credits payment',
      description: 'Credits payment',
      order_id: order.id,
      receipt:order.receipt,
      handler : async (res)=>{
        try {
          
          const {data} = await axios.post(backendURL+'/api/user/verify' , res , {headers:{token}})

          if(data.success){
            loadCreditData()
            navigate('/result')
            toast.success("Payment Successful . Credits added.")
          }

        } catch (error) {
          toast.error(error.message)
        }
        
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentraz = async(planId)=>{
    try {
      if(!user){
        setShowLogin(true)
      }

     const {data} =  await axios.post(backendURL + "/api/user/pay-razor" , {planId} , {headers:{token}})

     if(data.success){
      initpay(data.order)
     }


    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }} //how many times the animation will appear for this number of times we scroll
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left ">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border  rounded-lg px-8 py-5 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} width={40} />
            <p className="font-semibold mt-3 mb-1">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> /{" "}
              {item.credits} credits
            </p>
            <button onClick={()=>paymentraz(item.id)} className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 hover:scale-90 duration-200">
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
