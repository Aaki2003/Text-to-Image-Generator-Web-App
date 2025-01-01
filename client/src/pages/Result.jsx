import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const {generateImage} = useContext(AppContext)


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    //if input i.e. prompt is available
    if(input){
      const image = generateImage(input) // pass input to generateImage
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }

    setLoading(false)
  };
  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }} //how many times the animation will appear for this number of times we scroll
      className="flex flex-col min-h-[90vh] justify-center items-center"
      onSubmit={onSubmitHandler}
    >
      <div>
        <div className="relative">
          <img src={image} className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 ${
              loading
                ? "bg-blue-500 w-full transition-all duration-[10s]"
                : "w-0"
            } `}
          />
        </div>
        <p className={!loading ? "hidden" : ""}>Loading ...</p>
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white rounded-full text-sm p-0.5 mt-10">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe What You Want To Generate "
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20"
          />
          <button className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full hover:scale-[1.05] duration-200">
            Generate
          </button>
        </div>
      )}
      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm rounded-full p-0.5 mt-10 ">
          <p
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:scale-[1.05] duration-200"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-8 py-3 rounded-full cursor-pointer hover:scale-[1.05] duration-200"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
