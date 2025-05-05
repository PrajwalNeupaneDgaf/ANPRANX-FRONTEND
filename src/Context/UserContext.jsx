import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import LoadingComponent from "../Components/LoadingComponent";
import { io, Socket } from 'socket.io-client';

const userContext = createContext();

const UserContext = ({ children }) => {
  const [Loading, setLoading] = useState(false);

  //user Authorizations
  const [User, setUser] = useState({});
  const [IsAuthorized, setIsAuthorized] = useState(1);



  const [Messages, setMessages] = useState([])
  const [Notifications, setNotifications] = useState([])
  const [Posts, setPosts] = useState([])
  const [Requests, setRequests] = useState([])
  const [SentRequests, setSentRequests] = useState([])

  console.log(import.meta.env.VITE_MODE)
  //https://anprax-backend.onrender.com
  const socket = io(import.meta.env.VITE_MODE!=="DEVELOPMENT"?"https://anprax-backend.onrender.com":'http://localhost:5000', {
    query: {
      id: '123224' 
    }
  });

//   useEffect(() => {
//     socket?.on("new:user",handleAnotherLogin)
  
//     return () => {
//       socket?.off("new:user",handleAnotherLogin)
//     }
//   }, [socket])
  
// const handleAnotherLogin = useCallback(({data})=>{
// alert(data)
// },[socket])


 
  if (Loading) return <LoadingComponent/>
  return (
    <userContext.Provider
      value={{
        User,
        setUser,
        IsAuthorized,
        setIsAuthorized,
  
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContext;

export const useUser = () => {
  return useContext(userContext);
};
