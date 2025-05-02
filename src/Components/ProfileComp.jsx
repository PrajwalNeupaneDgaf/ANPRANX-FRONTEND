import React, { useRef, useState } from "react";
import Dialog from "./Dialog";
import { useData } from "../Context/DataContext";

const ProfileComp = ({ IsMineProfile,IsRequested , IsFriend=1 , ManageRequest  }) => {

   const [showOptions, setshowOptions] = useState(false)
   const [DisplayBlocked, setDisplayBlocked] = useState(false)
   const [DisplayUnfriend, setDisplayUnfriend] = useState(false)

    const { showToast } = useData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white my-2 rounded-2xl shadow-xl p-1 py-4">
      <div className="flex justify-center items-center flex-col">
        <div className="rounded-full h-64 w-64 bg-gray-500 border-2 border-solid border-orange-400"></div>
        <h1 className="text-gray-800 font-semibold text-lg md:text-xl mb-3">Prajwal Neupane</h1>
        {!IsMineProfile ? (
          <div className="flex flex-wrap justify-center items-center gap-2">
           {
            !IsRequested && !IsFriend &&
           (
            <button className="text-gray-100 bg-gray-800 p-1 cursor-pointer rounded-sm w-[13rem] ">AddFriend</button>
           )
           }
           {
            IsRequested && (
                <button className="text-gray-100 bg-gray-700 p-1 cursor-pointer rounded-sm w-[13rem] ">Cancel Request</button>
            )
           }
           {
            IsFriend && (
                <button onClick={()=>{
                    setshowOptions(true)
                }} className="text-gray-100 bg-gray-700 p-1 cursor-pointer rounded-sm w-[13rem] ">Manage Friends</button>
            )
           }
            <button className="text-gray-100 bg-gradient-to-r from-orange-400 to-orange-600 p-1 cursor-pointer rounded-sm w-[13rem] ">Message</button>
          </div>
        ) : (
            <div className="flex flex-wrap justify-center items-center gap-2">
            <button className="text-gray-100 bg-gray-800 p-1 cursor-pointer rounded-sm w-[13rem] ">Add Profile</button>
            <button className="text-gray-100 bg-gradient-to-r from-orange-400 to-orange-600 p-1 cursor-pointer rounded-sm w-[13rem] ">Edit Profile</button>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-600 px-2">Friends:</h2>
        <div className="flex justify-center items-center gap-3 flex-wrap pt-3 min-h-[8rem]">
          {/* {Array.from({ length: 15 })
            .fill("")
            .map((itm, idx) => {
              return (
                <div>
                  <div className="h-14 w-14 rounded-full bg-gray-600 cursor-pointer"></div>
                </div>
              );
            })} */}
            <h1 className="text-xl text-gray-600">
                !! No Friends !!
            </h1>
        </div>
      </div>
    { showOptions &&
        <div onClick={()=>{
            setshowOptions(false)
        }} className="fixed inset-0 z-40 bg-[#00000034] flex justify-center items-center px-3">
            <div onClick={(e)=>{
                e.stopPropagation()
            }} className="bg-white rounded p-4 w-[21rem] max-w-[96vw] flex justify-center items-center shadow-2xl flex-col gap-2">
                <button onClick={()=>{
                    setshowOptions(false)
                    setDisplayUnfriend(true)
                }} className="w-full p-2 bg-gray-600 rounded cursor-pointer  font-semibold text-gray-100">
                    Unfriend
                </button>
                <button onClick={()=>{
                    setshowOptions(false)
                    setDisplayBlocked(true)
                }}  className="w-full p-2 bg-orange-600 rounded cursor-pointer  font-semibold text-gray-100">
                    Block
                </button>
            </div>                
        </div>
    }


{DisplayBlocked && (
        <Dialog
          setDisplay={setDisplayBlocked}
          Title={"Do You Want to Block"}
          Description={
            "The User Prajwal Neupane will be blocked . Are you sure you want to Block?"
          }
          Accept={() => {
            showToast({
              message: "You Blocked SuccesFully",
              type: "success",
            });
            setManageFriends(false);
          }}
          Reject={() => {
            setManageFriends(false);
          }}
        />
      )}
      {DisplayUnfriend && (
        <Dialog
          setDisplay={setDisplayUnfriend}
          Title={"Do You Want to Unfriend"}
          Description={
            "The User Prajwal Neupane will no more be Your Friend . Are you sure you want to unfriend?"
          }
          Accept={() => {
            showToast({
              message: "You Unfriend SuccesFully",
              type: "success",
            });
            setManageFriends(false);
          }}
          Reject={() => {
            setManageFriends(false);
          }}
        />
      )}
    </div>
  );
};

export default ProfileComp;
