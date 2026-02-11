import axios from "axios";
import React, { useEffect, useState, createContext } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = import.meta.env.VITE_BACKEND_URL;
  // const serverUrl = "http://localhost:8001";

  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const result = await fetch(`${serverUrl}/api/user/profile`, {
        credentials: "include",
      });

      if (!result.ok) return;

      const data = await result.json();
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGeminiResponse=async(command)=>{
    try {
      const result =await axios.post(`${serverUrl}/api/user/asktoassistant`,
        {command},{withCredentials:true}
      );
      return result.data;
    } catch (error) {
      console.log("ASK ERROR:", error);
      throw error;
    }
  }

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
