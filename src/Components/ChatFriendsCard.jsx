import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const ChatFriendsCard = ({ data }) => {
  const navigate = useNavigate();

  console.log(data)

  const {timeAgo} = useUser()
  return (
    <div
      onClick={() => {
        navigate(`/messages/${data?.User?._id}`);
      }}
      className="cursor-pointer flex relative flex-row  justify-between gap-2 p-2 my-2 border border-solid border-gray-200 rounded-xl"
    >
      <div className="flex gap-1 md:gap-2 items-center h-full ">
        <div className="flex h-full justify-center items-center ">
          <img
            src={data?.User.Profile}
            alt={data?.User.name}
            className="bg-gray-500 rounded-full w-9 h-9 md:w-12 md:h-12 cursor-pointer"
          />
        </div>
        <div className="flex flex-col ">
          <strong className="text-sm md:text-[1.05em] text-yellow-700 select-none  hover:underline">
            {data?.User?.Name}
          </strong>
          <p className="text-xs md:text-sm text-gray-700">{data?.LastText.slice(0,20)}</p>
        </div>
      </div>
      <div className="flex select-none text-xs gap-2 px-4 justify-center items-center font-light text-gray-500">
       {timeAgo(data.updatedAt)}
      </div>
    </div>
  );
};

export default ChatFriendsCard;
