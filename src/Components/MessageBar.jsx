import React from "react";
import { useUser } from "../Context/UserContext";

const MessageBar = ({ data }) => {


  const {User,timeAgo} = useUser()
  return (
    <div
      className={`my-2 w-full flex ${
        data?.Sender == User?._id ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`w-[27rem] max-w-[90%] p-2 rounded ${
          data?.Sender == User?._id ? "bg-[#000000b6] text-white" : "bg-[#77766fb2]"
        }`}
      >
        <div className="text-xs md:text-sm">{data.Message}</div>
        <h5 className={`text-end font-thin text-xs ${ data?.Sender == User?._id?'text-gray-100':"text-gray-800"}`}>
           {timeAgo(data.createdAt)}
        </h5>
      </div>
    </div>
  );
};

export default MessageBar;
