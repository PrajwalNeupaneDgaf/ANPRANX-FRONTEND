import React, { useState } from "react";
import {
  IoChatboxOutline,
  IoChatboxSharp,
  IoClose,
  IoHomeOutline,
  IoHomeSharp,
  IoMenuOutline,
  IoMenuSharp,
  IoNotificationsOutline,
  IoNotificationsSharp,
  IoPersonAddOutline,
  IoPersonAddSharp,
  IoSearch,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const Navbar = () => {
  const pathName = location.pathname; //fetching pathname

  const navigate = useNavigate();

  //input value Search
  const [SearchValue, setSearchValue] = useState("");

  const Search = ()=>{
  if(SearchValue){
    navigate(`/search=/${SearchValue}`)
  }
  }

  const {User,Requests} = useUser()
  return (
    <div className="z-30 fixed min-h-[4rem] top-0 w-full max-w-[120rem] py-2 px-3 shadow-sm gap-5 bg-gray-50 md:px-8 flex lg:flex-row flex-col justify-between lg:items-center ">
      <nav className="flex md:gap-3 gap-2 items-center w-full">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="text-xl md:text-2xl font-extrabold select-none cursor-pointer bg-gradient-to-r bg-clip-text text-transparent from-yellow-300 via-orange-700 to-yellow-800"
        >
          ANPRAX
        </div>
        <div className=" flex  justify-center items-center border-solid border bg-gray-50 border-[#e2f7b2] rounded-md lg:w-[20rem] w-full">
          <input
            onKeyDown={(e)=>{
              if(e.key=="Enter"){
                Search()
              }
            }}
            value={SearchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            type="text"
            placeholder="Search here..."
            className=" bg-transparent w-full border-none outline-none p-1 md:font-md"
          />
          {SearchValue && <IoClose onClick={()=>{
            setSearchValue('')
          }} className="cursor-pointer" size={20} />}
          <IoSearch onClick={Search} size={20} className="cursor-pointer mx-1" />
        </div>
        <div
          onClick={() => {
            navigate("/menu");
          }}
          className={`lg:hidden flex justify-center items-center gap-1  select-none ${
            pathName.startsWith("/menu")
              ? "text-yellow-600 font-semibold "
              : "cursor-pointer"
          }`}
        >
          <span>
            {pathName.startsWith("/menu") ? (
              <IoMenuSharp size={24} />
            ) : (
              <IoMenuOutline size={24} />
            )}
          </span>
          <span className="hidden sm:block"> Menu</span>
        </div>
      </nav>

      {/* Second Navbar  */}
      <nav className="flex items-center justify-between lg:w-[65rem]  w-full gap-4 md:gap-6">
        <div
          onClick={() => {
            navigate("/");
          }}
          className={`flex justify-center items-center gap-1  select-none ${
            pathName == "/"
              ? "text-yellow-600 font-semibold "
              : "cursor-pointer"
          }`}
        >
          <span>
            {pathName == "/" ? (
              <IoHomeSharp size={20} />
            ) : (
              <IoHomeOutline size={20} />
            )}
          </span>
          <span  className="hidden sm:block"> Home</span>
        </div>

        <div
          notify={Requests?.length>0?Requests.length:null}
          onClick={() => {
            navigate("/requests");
          }}
          className={` flex justify-center items-center gap-1  select-none ${
            pathName.startsWith("/requests")
              ? "text-yellow-600 font-semibold"
              : "cursor-pointer"
          }`}
        >
          <span>
            {pathName.startsWith("/requests") ? (
              <IoPersonAddSharp size={18} />
            ) : (
              <IoPersonAddOutline size={18} />
            )}
          </span>
          <span  className="hidden sm:block"> Request</span>
        </div>
        <div
          onClick={() => {
            navigate("/messages");
          }}
          className={` flex justify-center items-center gap-1  select-none ${
            pathName.startsWith("/messages")
              ? "text-yellow-600 font-semibold "
              : "cursor-pointer"
          }`}
        >
          <span>
            {pathName.startsWith("/messages") ? (
              <IoChatboxSharp size={20} />
            ) : (
              <IoChatboxOutline size={20} />
            )}
          </span>
          <span className="hidden sm:block"> Message</span>
        </div>
        <div
          notify={User?.Notification?.length}
          onClick={() => {
            navigate("/notifications");
          }}
          className={` flex justify-center items-center gap-1  select-none ${
            pathName.startsWith("/notifications")
              ? "text-yellow-600 font-semibold "
              : "cursor-pointer"
          }`}
        >
          <span>
            {pathName.startsWith("/notifications") ? (
              <IoNotificationsSharp size={20} />
            ) : (
              <IoNotificationsOutline size={20} />
            )}
          </span>
          <span className="hidden sm:block"> Notification</span>
        </div>
        <div
          onClick={() => {
            navigate("/menu");
          }}
          className={` lg:flex hidden justify-center items-center gap-1  select-none ${
            pathName.startsWith("/menu")
              ? "text-yellow-600 font-semibold "
              : "cursor-pointer"
          }`}
        >
          <span>
            {pathName.startsWith("/menu") ? (
              <IoMenuSharp size={24} />
            ) : (
              <IoMenuOutline size={24} />
            )}
          </span>
          <span className="hidden md:block"> Menu</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
