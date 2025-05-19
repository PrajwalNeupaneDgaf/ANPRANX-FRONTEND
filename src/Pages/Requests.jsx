import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { IoRepeat } from "react-icons/io5";
import RequestCard from "../Components/RequestCard";
import FriendsCard from "../Components/FriendsCard";
import { useUser } from "../Context/UserContext";
import SentRequestComp from "../Components/SentRequestComp";

const Requests = () => {
  const [IsSentRequestOn, setIsSentRequestOn] = useState(false);
  const [LoadMore, setLoadMore] = useState(false);
  const [Length, setLength] = useState(3);

  const changeTab = () => {
    setIsSentRequestOn(!IsSentRequestOn);
  };

  const { Requests, SentRequests, Friends } = useUser();
  return (
    <Layout bg={"bg-gray-100"}>
      <div className="min-h-12  rounded-2xl py-2 my-1 md:my-2 shadow-lg bg-white p-2 md:p-4">
        <div className=" flex justify-between items-center">
          <div className="font-semibold md:text-xl text-sm text-gray-700 select-none">
            {IsSentRequestOn ? "Sent" : "Received"}
          </div>
          <div
            onClick={changeTab}
            className="select-none text-yellow-600 cursor-pointer flex justify-center items-center gap-1 font-semibold text-sm"
          >
            {IsSentRequestOn ? "Received" : "Sent"}
            <IoRepeat size={20} />
          </div>
        </div>
        {!IsSentRequestOn ? (
          <>
            {Requests?.slice(0, Length).map((itm, idx) => {
              return <RequestCard key={idx} data={itm} />;
            })}
            {Request.length > 3 && (
              <div className="flex justify-center items-center pt-6 ">
                <button
                  onClick={() => {
                    if (LoadMore) {
                      setLoadMore(false);
                      setLength(3);
                    } else {
                      setLoadMore(true);
                      setLength(Requests.length);
                    }
                  }}
                  className="select-none py-1 px-4 font-semibold text-yellow-700 text-sm md:text-[1em] cursor-pointer flex justify-center items-center rounded"
                >
                  {LoadMore ? "Load Less.." : "Load More.."}
                </button>
              </div>
            )}
          </>
        ) : (
          ""
        )}
        {Requests?.length == 0 && !IsSentRequestOn && (
          <div className="flex text-gray-400 justify-center items-center h-[16rem] text-xl md:text-2xl">
            NO REQUEST FOUND
          </div>
        )}
        {SentRequests.length == 0 && IsSentRequestOn && (
          <div className="flex text-gray-400 justify-center items-center h-[16rem] text-xl md:text-2xl">
            NO REQUEST Sent
          </div>
        )}
        {SentRequests &&
          IsSentRequestOn &&
          SentRequests?.map((itm, idx) => (
            <SentRequestComp key={idx} itm={itm} />
          ))}
      </div>
      <div className="py-3"></div>
      <div className="min-h-12  rounded-2xl py-2  my-1 md:my-2 shadow-lg bg-white p-2 md:p-4">
        <div className="font-semibold md:text-xl text-sm text-gray-700 select-none">
          Friends
        </div>
        {Friends?.length == 0 ? <div className="text-xl flex font-semibold text-gray-500 justify-center items-center h-40 ">
          !!No Friends
        </div> : <>
        {
          Friends?.map(itm=>{
           return <FriendsCard key={itm?._id} data={itm}/>
          })
        }
        </>}
      </div>
    </Layout>
  );
};

export default Requests;
