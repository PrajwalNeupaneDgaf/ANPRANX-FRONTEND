import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { IoChevronForward, IoLogOut, IoLogOutOutline } from "react-icons/io5";
import Dialog from "../Components/Dialog";
import { useData } from "../Context/DataContext";
import MenuOptions from "../Components/MenuOptions";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const Menu = () => {
  const [Display, setDisplay] = useState(false);

  const navigate = useNavigate()

  const {User ,setIsAuthorized} = useUser()


  const { showToast } = useData();
  return (
    <Layout bg="bg-gray-100">
      <div className="my-1 md:my-2 bg-white shadow-xl rounded-xl p-3">
        <div className="flex gap-1 md:gap-2 justify-between items-center h-full ">
          <div onClick={()=>{
            navigate(`/profile/${User?._id}`)
          }} className="flex gap-1 md:gap-2 items-center h-full">
            <div className="flex h-full justify-center items-center ">
             { User.Profile?<img
                src={User?.Profile}
                alt={User?.Name}
                className="bg-gray-500 rounded-full w-12 h-12 md:w-18 md:h-18 cursor-pointer object-cover"
              />:
              <div  className="bg-conic-210 from-orange-300  via-orange-700 to-orange-800 rounded-full w-12 h-12 md:w-18 md:h-18 cursor-pointer">
                
              </div>}
            </div>
            <div>
              <strong className="text-[.8em] md:text-[1.20em] text-yellow-700 select-none">
               {User?.Name}
              </strong>
              <p className="text-yellow-700 select-none  hover:underline flex cursor-pointer font-semibold text-sm group">
                Visit Profile{" "}
                <span className="hidden group-hover:flex items-center">
                  <IoChevronForward />
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setDisplay(true);
            }}
            className="flex justify-center items-center gap-1 h-[38px] text-xs md:text-sm rounded-xl px-4 border border-solid border-gray-200 font-semibold  cursor-pointer text-yellow-700"
          >
            Logout <IoLogOutOutline size={19} />
          </button>
        </div>
        <hr className="mt-3 border border-solid border-gray-400" />
        <div className="py-3">
          <MenuOptions />
        </div>
      </div>

      {Display && (
        <Dialog
          setDisplay={setDisplay}
          Title={"Logout From This Session"}
          Accept={() => {
            setIsAuthorized(false)
            localStorage.removeItem('Token')
            showToast({
              message: "Logout Successfull",
            });
          }}
          Description={
            "You will be logout from this Session and redirected to login !"
          }
        />
      )}
    </Layout>
  );
};

export default Menu;
