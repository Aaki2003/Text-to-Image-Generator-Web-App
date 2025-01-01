import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");

  const { setShowLogin, backendURL, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault() //prevent the page from reloading

    try {
      if (state === "Login") {
        // here we are getting the response and stored in data
        const { data } = await axios.post(backendURL +'/api/user/login', {
          email,
          password
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          // store token in browsers local storage
          localStorage.setItem('token', data.token);

          //to hide the login form
          setShowLogin(false);
        } else {
          // toast notification
          toast.error(data.message);
        }
      } else {
        // here we are getting the response and stored in data
        const {data} = await axios.post(backendURL + '/api/user/register', {
          name,
          email,
          password
        });


        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          // store token in browsers local storage
          localStorage.setItem('token', data.token);

          //to hide the login form
          setShowLogin(false);
        } else {
          // toast notification
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} width={20} />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="outline-none text-sm"
              placeholder="Full Name"
              required
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="outline-none text-sm"
            placeholder="Email"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="outline-none text-sm"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4  cursor-pointer">
          Forgot Password?
        </p>

        <button className="bg-blue-600 w-full text-white rounded-full py-2 hover:scale-[1.03]">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="text-center mt-5">
            Dont have an account ?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-center mt-5">
            Already have an account ?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}
        <img
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer hover:scale-[1.05] "
          onClick={() => setShowLogin(false)}
        />
      </form>
    </div>
  );
};

export default Login;
