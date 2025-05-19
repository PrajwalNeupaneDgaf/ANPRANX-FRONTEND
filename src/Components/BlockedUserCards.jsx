import React, { useState } from "react";
import { useUser } from "../Context/UserContext";

const BlockedUserCards = ({ data }) => {
    const [isUnblocking, setisUnblocking] = useState(false)

    const {UnBlockUser} = useUser()
  return (
    <div className="flex relative  flex-col sm:flex-row  sm:justify-between sm:items-center gap-2 p-2 my-2 border border-solid border-gray-200 rounded-xl">
        <div className="flex flex-row gap-2 sm:justify-center sm:items-center ">
            <img src={data?.Profile} alt={data?.Name} className="h-12 w-12 rounded-full shadow object-cover" />
            <div>
                <strong className="text-md md:text-lg text-orange-800">
                    {data?.Name}
                </strong>
                <p className="font-semibold text-sm text-gray-500">
                    @{data?.UserName}
                </p>
            </div>
        </div>
        <div className="flex justify-center items-center sm:w-fit w-full">
            <button onClick={()=>{
                UnBlockUser(data?._id,setisUnblocking)
            }} className="sm:max-w-[14rem] rounded-xl font-semibold text-gray-50 px-6 w-full sm:w-[11rem] p-1 md:p-2 bg-orange-500 hover:bg-orange-600 cursor-pointer">
                {isUnblocking?"unblocking...":"Unblock"}
            </button>
        </div>
    </div>
  );
};

export default BlockedUserCards;
