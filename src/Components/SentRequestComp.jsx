import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axios";
import {toast} from "react-hot-toast"
import { useUser } from "../Context/UserContext";

const SentRequestComp = ({ itm }) => {
  const navigate = useNavigate();

  const [Canceling, setCanceling] = useState(false);

  const {cancelrequest} = useUser()
   
 
  return (
    <div className="flex flex-col md:flex-row gap-3  md:justify-between shadow p-1 bg-gray-50 rounded border border-solid border-gray-300">
      <div
        onClick={() => {
          navigate(`/profile/${itm?._id}`);
        }}
        className="flex flex-row gap-5 md:justify-center "
      >
        <img
          src={itm.Profile}
          alt={itm?.Name}
          className="rounded-full h-12 w-12 md:h-14 md:w-14"
        />
        <div className="flex flex-col justify-center">
          <strong className="text-sm md:text-[1.05em] text-yellow-700 select-none cursor-pointer hover:underline">
            {itm?.Name}
          </strong>
          <p className="text-sm font-semibold text-gray-600">
            @{itm?.UserName}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button onClick={()=>{
            cancelrequest(itm?._id, setCanceling)
        }} className="md:p-2 p-1 px-6 w-full md:w-[17rem] text-sm rounded-lg cursor-pointer text-gray-50 font-semibold bg-orange-500 hover:bg-orange-600">
          {Canceling ? "Cancelling..." : " Cancel Request"}
        </button>
      </div>
    </div>
  );
};

export default SentRequestComp;
