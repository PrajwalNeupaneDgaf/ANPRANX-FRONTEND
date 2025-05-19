import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { IoChatboxSharp, IoSearch } from "react-icons/io5";
import ChatFriendsCard from "../Components/ChatFriendsCard";
import { useUser } from "../Context/UserContext";
import LoadingComponent from "../Components/LoadingComponent";
import instance from "../axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const [SearchValue, setSearchValue] = useState("");
  const { ChatList, setChatList, Friends } = useUser();

  const [LoadingPage, setLoadingPage] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    instance
      .get("/message/get-chats")
      .then((res) => {
        const data = res.data.Chats.Chats;
        console.log(res.data)
        setChatList(data);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error Fetching Data");
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);

  const [Filtered, setFiltered] = useState([]);

  const filterFriends = (text) => {
    const data = Friends.filter((itm) => {
      const lowerText = text.toLowerCase();
      return (
        itm.Name.toLowerCase().includes(lowerText) ||
        itm.UserName.toLowerCase().includes(lowerText)
      );
    });
    setFiltered(data);
  };

  if (LoadingPage) return <LoadingComponent />;
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
                filterFriends(e.target.value);
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
          <>
            {Filtered.length == 0 && (
              <div className="text-gray-400 text-xl md:text-2xl  flex justify-center items-center min-h-[21rem] overflow-y-scroll noScrollBar">
                NO USER FOUND
              </div>
            )}
            {Filtered?.map((itm, idx) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/messages/${itm?._id}`);
                  }}
                  className="cursor-pointer flex relative flex-row  justify-between gap-2 p-2 my-2 border border-solid border-gray-200 rounded-xl"
                >
                  <div className="flex gap-1 md:gap-2 items-center h-full ">
                    <div className="flex h-full justify-center items-center ">
                      <img
                        src={itm?.Profile}
                        alt={itm?.Name}
                        className="bg-gray-500 rounded-full w-9 h-9 md:w-12 md:h-12 cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col ">
                      <strong className="text-sm md:text-[1.05em] text-yellow-700 select-none  hover:underline">
                      {itm?.Name}
                      </strong>
                      <p className="text-xs md:text-sm text-gray-700">
                       @{itm?.UserName}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <div className="overflow-y-scroll noScrollBar h-full flex flex-col gap-1 pb-12">
          {!SearchValue && (
            <>
              {ChatList?.map((itm, idx) => {
                return <ChatFriendsCard key={idx} data={itm} />;
              })}
            </>
          )}
          {ChatList.length == 0 && !SearchValue && (
            <div className="text-xl font-semibold text-gray-500 flex justify-center items-center h-60">
              NO Chats Add New
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
