import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState("");

  const storeToken = (token) => {
    localStorage.setItem("token", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const user = response.data;

          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
    return <Navigate to="/login" />;
  };

  useEffect(() => {
    authenticateUser();
  }, []);


  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  useEffect(() => {
    const getApi = async () => {
      const options = {
        method: 'GET',
        url: 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote',
        params: {
          token: 'ipworld.info'
        },
        headers: {
          'X-RapidAPI-Key': 'e01bb5815fmsh79bcea88d9e0940p17b40bjsnc626c53007fe',
          'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        setQuote(response.data.text);
        console.log(response.data.text);
      } catch (error) {
        console.error(error);
      }
    };

    getApi();
  }, [formattedDate]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        quote,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
