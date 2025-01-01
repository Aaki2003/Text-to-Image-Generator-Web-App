import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [credit, setCredit] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate()

  const loadCreditData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/credits", {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );

      if(data.success){
        loadCreditData()
        return data.resultImage
      }else{
        toast.error(data.message);
        loadCreditData()
        if(data.creditBalance === 0){
            navigate('/buy')
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const logout = () => {
    // remove item with key name token
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate('/')
  };

  // whenever the token will be changed this arrow function will be called
  useEffect(() => {
    if (token) {
      loadCreditData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendURL,
    credit,
    setCredit,
    token,
    setToken,
    loadCreditData,
    logout,
    generateImage
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
