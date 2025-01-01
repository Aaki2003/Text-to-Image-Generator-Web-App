import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from "motion/react";

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}   //how many times the animation will appear for this number of times we scroll
      className="flex flex-col items-center justify-center my-32"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        {" "}
        Customer Testimonials
      </h1>
      <p className="text-lg text-gray-600 mb-8">What Our Users Are Saying</p>

      <div className="flex flex-wrap gap-6">
        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className="bg-white/20 p-10 rounded-lg shadow-md border border-black w-80 m-auto cursor-pointer hover:scale-[1.05] transition-all duration-200"
          >
            <div className="flex flex-col items-center">
              <img src={item.image} className="rounded-full w-14" alt="/" />
              <h2 className="text-xl font-semibold mt-3">{item.name}</h2>
              <p className="text-gray-600 mb-4">{item.role}</p>
              <div className="flex mb-4">
                {Array(item.stars)
                  .fill()
                  .map((item2, index2) => (
                    <img key={index2} src={assets.rating_star} />
                  ))}
              </div>
              <p className="text-center text-sm">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
