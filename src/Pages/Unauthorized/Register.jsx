import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutUnAuthorized from "./LayoutUnAuthorized";

const Register = () => {
  const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Gender, setGender] = useState('Male')

  const Genders = [
    "Male",
    "Female",
    "Others"
  ]

  const [Message, setMessage] = useState("");

  const Register = () => {
    setMessage("Error Check");
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
            Register
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
            <label htmlFor="Name" className="font-semibold text-gray-800 my-1">
              Name:
            </label>
            <input
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="Name"
              type="text"
              placeholder="Name"
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
          <div className="flex gap-2 flex-col md:flex-row md:items-center mt-2">
            <label className="whitespace-nowrap md:font-semibold text-gray-900 justify-center">
              Your Gender:
            </label>
            <div className="flex md:justify-center gap-4 md:items-center w-full">
              {Genders.map((itm, idx) => {
                return (
                  <button
                    onClick={() => {
                      setGender(itm);
                    }}
                    key={idx}
                    className={`p-2 font-semibold w-full md:min-w-20 flex justify-center   cursor-pointer rounded ${
                      itm == Gender ? "bg-orange-600 text-white" : "bg-gray-400"
                    }`}
                  >
                    {itm.slice(0, 1)}
                  </button>
                );
              })}
            </div>
          </div>
          <div
            onClick={() => {
              navigate("/login");
            }}
            className="pt-1 font-semibold select-none cursor-pointer hover:underline text-orange-800"
          >
            Do Have Accout? Login.
          </div>
          <div>
            <button
              onClick={Register}
              className="w-full p-2 bg-gradient-to-l from-orange-500 to-orange-700 font-semibold text-white rounded mt-1 cursor-pointer"
            >
              Register
            </button>
          </div>
          {Message && (
            <div
              className={` bg-red-200 text-red-600 p-2 select-none text-sm md:text-md md:font-semibold rounded mt-2`}
            >
              *{Message}
            </div>
          )}
        </div>
      </div>
    </LayoutUnAuthorized>
  );
};

export default Register;
