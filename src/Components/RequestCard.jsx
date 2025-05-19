import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const RequestCard = ({data}) => {
  const navigate = useNavigate()

  const {ManageRequest} = useUser()

  const [Loading, setLoading] = useState(false)
  return (
    <div className="flex md:flex-row flex-col md:justify-between gap-2 p-2 my-2 border border-solid border-gray-200 rounded-xl">
      <div onClick={()=>{
        navigate(`/profile/${data?._id}`)
      }} className="flex gap-1 md:gap-2  items-center h-full ">
        <div className="flex h-full justify-center items-center ">
          <img
            src={data?.Profile}
            alt={data?.Name}
            className="bg-gray-500 rounded-full w-9 h-9 md:w-12 md:h-12 object-cover cursor-pointer"
          />
        </div>
        <div>
          <strong className="text-sm md:text-[1.05em] text-yellow-700 select-none cursor-pointer hover:underline">
            {data?.Name}
          </strong>
          <p className="text-sm font-semibold text-gray-600">
            @{data?.UserName}
          </p>
        </div>
      </div>
      <div className="flex gap-2 px-4 items-center w-full md:w-fit justify-center ">
        <button onClick={()=>{
          if(Loading){
            return
          }
          ManageRequest(data?._id , false ,setLoading )
        }} className="md:w-[12rem] w-full rounded py-1 md:py-2 bg-gray-700 hover:bg-gray-800 text-sm text-yellow-100 md:font-semibold cursor-pointer">
         {Loading?"Wait...":"Reject"}
        </button>
        <button onClick={()=>{
          if(Loading){
            return
          }
          ManageRequest(data?._id , true ,setLoading )
        }} className="md:w-[12rem] w-full rounded py-1 md:py-2 text-gray-100 bg-yellow-700 text-sm hover:bg-yellow-800 md:font-semibold cursor-pointer">
           {Loading?"Wait...":"Accept"}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
