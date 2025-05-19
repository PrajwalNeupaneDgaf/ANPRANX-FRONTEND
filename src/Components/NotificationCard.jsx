import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import instance from "../axios";

const NotificationCard = ({ data }) => {
  const navigate = useNavigate();


  const { timeAgo } = useUser();

  const ClickedNotification = async () => {
    if(!data.Isread){
      await instance.get(`/notification/clicked/${data._id}`);
    }

    navigate(data?.Link)
  };
  return (
    <div
      onClick={ClickedNotification}
      className={`cursor-pointer ${
        data?.Isread ? "bg-gray-50" : "bg-gray-100"
      } flex relative flex-row  justify-between gap-2 p-2 my-1 border border-solid border-gray-200 rounded-xl`}
    >
      <div className="flex gap-1 md:gap-2 items-center h-full ">
        <div className="flex h-full justify-center items-center ">
          <img
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${data?.By?._id}`);
            }}
            src={data?.By?.Profile}
            alt="Error"
            className="bg-gray-500 rounded-full w-9 h-9 object-contain md:w-12 md:h-12 cursor-pointer"
          />
        </div>
        <div className="flex flex-col ">
          <strong className="text-sm font-semibold md:text-[1.05em] text-yellow-700 ">
            {data?.NotificationType == "Like"
              ? "You Got New Like"
              : data.NotificationType == "Comment"
              ? "You Got New Comment"
              : "Your Comment Got Reply"}
          </strong>
          <p className="text-xs md:text-sm text-gray-700">
            {data?.Description}
          </p>
        </div>
      </div>
      <div className="flex select-none text-xs gap-2  justify-center items-center font-light text-gray-500">
        {timeAgo(data.updatedAt)}
      </div>
    </div>
  );
};

export default NotificationCard;
