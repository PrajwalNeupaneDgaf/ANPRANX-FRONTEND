import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { IoChatboxSharp, IoSearch } from "react-icons/io5";
import ChatFriendsCard from "../Components/ChatFriendsCard";

const Messages = () => {
  const [SearchValue, setSearchValue] = useState("");
  return (
    <Layout bg="bg-gray-100">
      <div className="bg-white p-3 rounded-lg shadow-xl mt-2 h-[83dvh] md:h-[89dvh] overflow-hidden">
        <div className="flex justify-between ">
          <strong className="text-sm md:text-lg text-gray-700 flex gap-1 justify-center items-center">
            <IoChatboxSharp size={18} /> Messenger
          </strong>
          <div className="p-1 border border-solid border-gray-300 rounded-xl flex justify-center items-center gap-1 overflow-hidden md:w-[18rem] w-[13rem]">
            <input
              value={SearchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              type="text"
              placeholder="Search messenger"
              className="h-full w-full border-none outline-none py-1 px-2"
            />
            <IoSearch size={19} className="cursor-pointer" />
          </div>
        </div>


        <hr className="mt-3 border border-solid border-gray-400" />


        
        {SearchValue && (
          <div className="text-gray-400 text-xl md:text-2xl  flex justify-center items-center min-h-[21rem] overflow-y-scroll noScrollBar">
            NO USER FOUND
          </div>
        )}
        <div className="overflow-y-scroll noScrollBar h-full flex flex-col gap-1 pb-12">
          <ChatFriendsCard />

          <ChatFriendsCard />

          <ChatFriendsCard />

          <ChatFriendsCard />

          <ChatFriendsCard />

          <ChatFriendsCard />

          <ChatFriendsCard />

          <ChatFriendsCard />

          <ChatFriendsCard />
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
