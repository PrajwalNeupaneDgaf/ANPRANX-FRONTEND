import React, { createContext, useCallback, useContext, useState } from "react";
import LoadingComponent from "../Components/LoadingComponent";

const userContext = createContext();

const UserContext = ({ children }) => {
  const [Loading, setLoading] = useState(0);

  //user Authorizations
  const [User, setUser] = useState({});
  const [IsAuthorized, setIsAuthorized] = useState(true);

  //functions

  //login function
  const login = useCallback(async ({ data }) => {
    try {
    } catch (error) {}
  }, []);

  //Register

  const register = useCallback(async ({ data }) => {
    try {
    } catch (error) {}
  }, []);

  //Verify the Gmail
  const verify = useCallback(async ({ data }) => {
    try {
    } catch (error) {}
  }, []);

  //logout
  const logout = useCallback(({ data }) => {}, []);


  //Manage Profile Functions


  //Update Profile 

  const updateProfile  = useCallback(async ({ data }) => {
    try {
    } catch (error) {}
  }, []);


  //Add profile Pic

  const addProfile = useCallback(async ({ data }) => {
    try {
    } catch (error) {}
  }, []);

  //Add a post

  const addPost = useCallback(async ({ data }) => {
    try {
    } catch (error) {}
  }, []);

  //Messages

  if (Loading) return <LoadingComponent/>
  return (
    <userContext.Provider
      value={{
        User,
        setUser,
        IsAuthorized,
        setIsAuthorized,
        login,
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
