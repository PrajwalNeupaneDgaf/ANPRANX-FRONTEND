import React from "react";
import LayoutUnAuthorized from "./LayoutUnAuthorized";
import { useState } from "react";
import toast from "react-hot-toast";
import instance from "../../axios";
import { useNavigate, useParams } from "react-router-dom";

const ForgetPassword = () => {
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  const {token} = useParams()

  const navigate = useNavigate()

  const ChangePassword = async () => {
    if (!Password || Loading) {
      return;
    }
    setLoading(true)
    try {
      const data = await instance.post(`/user/password-change`,{NewPassword:Password , Code:token})
      toast.success("Password Changed Try Login")
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally{
      setLoading(false)
    }
  };
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
            Forget Password
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

          <div>
            <button
              disabled={Loading}
              onClick={() => {
                ChangePassword();
              }}
              className="w-full p-2 bg-gradient-to-l from-orange-500 to-orange-700 font-semibold text-white rounded mt-1 cursor-pointer"
            >
              {Loading ? "Wait..." : " Change"}
            </button>
          </div>
        </div>
      </div>
    </LayoutUnAuthorized>
  );
};

export default ForgetPassword;
