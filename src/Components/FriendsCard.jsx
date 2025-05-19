import React, { useState } from "react";
import { IoCloseSharp, IoEllipsisVertical } from "react-icons/io5";
import Dialog from "./Dialog";
import { useData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const FriendsCard = ({ data }) => {
  const navigate = useNavigate();

  const [ManageFriends, setManageFriends] = useState(false);
  const [DisplayBlocked, setDisplayBlocked] = useState(false);
  const [DisplayUnfriend, setDisplayUnfriend] = useState(false);

  const { showToast } = useData();

  const { UnfriendUser,BlockUser } = useUser();
  return (
    <div className="flex relative flex-row  justify-between gap-2 p-2 my-2 border border-solid border-gray-200 rounded-xl">
      <div
        onClick={() => {
          navigate(`/profile/${data?._id}`);
        }}
        className="flex gap-1 md:gap-2  items-center h-full "
      >
        <div className="flex h-full justify-center items-center ">
          <img
            src={data?.Profile}
            alt={data?.Name}
            className="bg-gray-500 rounded-full w-9 h-9 md:w-12 md:h-12 cursor-pointer"
          />
        </div>
        <div>
          <strong className="text-sm md:text-[1.05em] text-yellow-700 select-none cursor-pointer hover:underline">
            {data?.Name}
          </strong>
        </div>
      </div>
      <div className="flex gap-2 px-4 items-center">
        <button
          onClick={() => {
            setManageFriends((p) => !p);
          }}
          className="cursor-pointer"
        >
          {ManageFriends ? (
            <IoCloseSharp size={20} />
          ) : (
            <IoEllipsisVertical size={20} />
          )}
        </button>
      </div>

      {ManageFriends && (
        <div className="bg-gray-100 z-20 flex flex-col shadow border border-solid border-gray-400 rounded-lg top-2 right-12 w-[14rem] p-3 absolute">
          <button
            onClick={() => {
              setDisplayUnfriend(true);
            }}
            className=" hover:bg-gray-200 py-1 h-full text-yellow-700 font-sm cursor-pointer"
          >
            Unfriend
          </button>
          <button
            onClick={() => {
              setDisplayBlocked(true);
            }}
            className=" py-1 h-full hover:bg-gray-200 text-red-600 font-sm cursor-pointer"
          >
            Block
          </button>
        </div>
      )}
      {DisplayBlocked && (
        <Dialog
          setDisplay={setDisplayBlocked}
          Title={"Do You Want to Block"}
          Description={
            "The User Prajwal Neupane will be blocked . Are you sure you want to Block?"
          }
          Accept={() => {
            BlockUser(data?._id)
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
            UnfriendUser(data?._id);
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

export default FriendsCard;
