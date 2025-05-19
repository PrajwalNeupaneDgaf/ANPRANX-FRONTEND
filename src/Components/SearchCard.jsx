import React from "react";
import { useNavigate } from "react-router-dom";

const SearchCard = ({data}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/profile/${data?._id}`);
      }}
      className="p-2 w-ful bg-gray-50 border border-solid border-gray-200 cursor-pointer rounded-xl flex flex-row my-2 gap-3 items-center"
    >
      <div className="h-14 w-14 bg-gray-600 rounded-full">
        <img src={data?.Profile} alt={data?.Name} className="h-full w-full rounded-full object-cover" />
      </div>
      <div>
        <h2 className="font-semibold text-sm md:text-lg hover:underline text-orange-800 cursor-pointer select-none">
          {data?.Name}
        </h2>
        <p className="text-sm font-semibold text-gray-600">
          @{data?.UserName}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
