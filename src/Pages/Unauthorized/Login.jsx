import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutUnAuthorized from "./LayoutUnAuthorized";
import { useUser } from "../../Context/UserContext";
import instance from "../../axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Message, setMessage] = useState("");
  const [Status, setStatus] = useState(false); //true is not Error False is Error

  const [Loading, setLoading] = useState(false)

  const {setIsAuthorized} = useUser()

  const Login = () => {
    if(!UserName || !Password){
      setMessage("Fill The Form Properly")
      return 
    }
    setLoading(true)
    instance.post('/user/login',{
      UserName:UserName,
      Password,
    }).then(res=>{
      setIsAuthorized(true)
      localStorage.setItem("Token",res.data.Token)
    }).catch((err)=>{
      setStatus(false)
      setMessage(err.response.data.message || "Something Went Wrong")
    }).finally(()=>{
      setLoading(false)
    })
  };
const [LoadingForgot, setLoadingForgot] = useState(false)
  const handleForgotPassword = async()=>{
    if(!UserName){
      toast.error("UserName Required")
    }
    if(LoadingForgot){
      return
    }
    try {
     const data =  await instance.post('/user/forgot-password',{UserName:UserName})
      setStatus(true)
      setMessage(data.data.message || "Sent Link in Your Gmail")
    } catch (error) {
      setStatus(false)
      setMessage(error.response.data.message || "Something Went Wrong")
    }
  }

  return (
    <LayoutUnAuthorized>
      <div className="flex justify-center items-center h-[100dvh] w-[100dvw] p-3 bg-gray-100">
        <div className="w-full md:w-[32rem] p-3 rounded shadow-xl bg-white border border-solid border-orange-300 pb-10">
          <div className="flex justify-center items-center flex-row gap-1">
            <img
              src="/download.png"
              alt="LOGO"
              className="h-12 w-12 rounded-full"
            />
            <div className="text-xl md:text-2xl font-extrabold select-none cursor-pointer bg-gradient-to-r bg-clip-text text-transparent from-yellow-300 via-orange-700 to-yellow-800">
              ANPRAX
            </div>
          </div>
          <div className="flex justify-center items-center text-lg font-semibold text-gray-700">
            Login
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="UserName"
              className="font-semibold text-gray-800 my-1"
            >
              UserName:
            </label>
            <input
              value={UserName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              id="UserName"
              type="text"
              placeholder="UserName"
              className="outline-none border border-solid border-gray-500 p-1 rounded-lg text-sm md:text-lg"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Password"
              className="font-semibold text-gray-800 my-1"
            >
              Password:
            </label>
            <input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="Password"
              type="password"
              placeholder="Password *******"
              className="outline-none border border-solid border-gray-500 p-1 rounded-lg text-sm md:text-lg"
            />
          </div>
          <div onClick={handleForgotPassword} className="pt-1 font-semibold select-none cursor-pointer hover:underline text-orange-800">
            Forget Password?
          </div>
          <div>
            <button
              disabled={Loading}
              onClick={() => {
                Login()
              }}
              className="w-full p-2 bg-gradient-to-l from-orange-500 to-orange-700 font-semibold text-white rounded mt-1 cursor-pointer"
            >
             {Loading?"Wait...":" Login"}
            </button>
          </div>
          <div
            onClick={() => {
              navigate("/register");
            }}
            className="pt-1 font-semibold select-none cursor-pointer hover:underline text-orange-800 text-center"
          >
            Don't Have Account Register?
          </div>
          {Message && (
            <div
              className={`${
                Status
                  ? "bg-green-200 text-green-600"
                  : " bg-red-200 text-red-600"
              } p-2 select-none text-sm md:text-md md:font-semibold rounded mt-2`}
            >
              *{Message}
            </div>
          )}
        </div>
      </div>
    </LayoutUnAuthorized>
  );
};

export default Login;
