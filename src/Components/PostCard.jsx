import React, { useEffect, useState } from "react";
import {
  IoBookmarkOutline,
  IoBookmarkSharp,
  IoChatbubble,
  IoChatbubbleSharp,
  IoChatbubblesOutline,
  IoEllipsisVerticalOutline,
  IoPencilSharp,
  IoSaveOutline,
  IoSaveSharp,
  IoSettingsOutline,
  IoThumbsUpOutline,
  IoThumbsUpSharp,
  IoTrashBin,
} from "react-icons/io5";
import { data, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import instance from "../axios";
import toast from "react-hot-toast";

const PostCard = ({
  data,
  isProfile,
  showLikes,
  isDetailPost,
  setDisplayLikes,
  FirstName,
  Others,
}) => {
  const navigate = useNavigate();

  const { timeAgo } = useUser();

  const [Liked, setLiked] = useState(false);
  const [Saved, setSaved] = useState(false);
  const [isMineProfile, setisMineProfile] = useState(false);

  const { User } = useUser();


  const isExist = (arr,isExtended) => {
    let data = false;
    if (isExtended) {
      arr?.filter((itm) => {
        if (itm._id == User._id) {
          data = true;
        }
      });
    } else {
      arr.filter((itm) => {
        if (itm == User._id) {
          data = true;
        }
      });
    }
    return data;
  };

  useEffect(() => {
    if (data.User?._id == User._id) {
      setisMineProfile(true);
    }
    const isLiked = isExist(data.Likes, isDetailPost);
    const isSaved = isExist(data.Saves)
    setLiked(isLiked);
    setSaved(isSaved)
  }, []);

  const [IsLiking, setIsLiking] = useState(false);
  const Like = () => {
    if (IsLiking) {
      return;
    }
    setIsLiking(true);
    instance
      .get(`/post/manage-liked/${data?._id}`)
      .then((res) => {
        const data = res.data;

        setLiked(!data.liked);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Failed");
      })
      .finally(() => {
        setIsLiking(false);
      });
  };
  const [Saving, setSaving] = useState(false);
  const Save = () => {
    if (Saving) {
      return;
    }
    setSaving(true);
    instance
      .get(`/post/manage-save/${data?._id}`)
      .then((res) => {
        const data = res.data;

        setSaved(data.Saved);
        toast(data.Saved?"Saved":"Unsaved")
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Failed");
      })
      .finally(() => {
        setSaving(false);
      });
  };
  return (
    <div className="w-full p-3 bg-white rounded-2xl shadow-md md:shadow-lg relative my-2">
      <div className="flex justify-between shadow-sm rounded-xl items-center py-2">
        <div
          onClick={() => {
            navigate(`/profile/${data.User?._id}`);
          }}
          className="w-full flex gap-1 md:gap-2 items-center"
        >
          <img
            loading="lazy"
            src={data?.User?.Profile}
            alt="Error"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-400 object-cover"
          />

          <div className="flex flex-col gap-0">
            <strong className="font-semibold text-sm  md:text-lg select-none hover:underline cursor-pointer text-yellow-700">
              {data?.User?.Name}
            </strong>
            <p className="text-xs text-gray-400">{timeAgo(data?.createdAt)}</p>
          </div>
        </div>

        {/* Add Image  */}

        {(isProfile || isMineProfile) && (
          <div
            className=" flex justify-center items-center px-2 md:px-4"
            onClick={() => {
              navigate(`/menu/post-edit/${data._id}`);
            }}
          >
            <IoSettingsOutline className="cursor-pointer mt-2" size={18} />
          </div>
        )}
      </div>
      {data?.Text && (
        <textarea
          readOnly
          value={data?.Text}
          className={`p-3  w-full h-fit rounded mt-2 pt-2 text-sm md:text-lg ${
            data.HasImage ? "font-[1.6rem] justify-center" : "font-semibold"
          } resize-none border-none outline-none cursor-default `}
        ></textarea>
      )}

      {data?.HasImage && (
        <div className="min-h-[16rem] flex justify-center items-center py-4">
          <img
            src={data?.Image?.Link}
            alt="Error"
            className="bg-gray-400 object-cover min-h-[36rem] w-[100%] sm:w-[25rem]  rounded-2xl"
          />
        </div>
      )}

      {showLikes && (
        <div
          onClick={() => {
            setDisplayLikes(true);
          }}
          className="px-3 text-sm md:text-[.99rem] select-none font-semibold cursor-pointer text-gray-600 bg-gray-50"
        >
          {FirstName} and {Others} others Liked ›
        </div>
      )}

      {/* Reacts  */}
      <div className=" rounded-lg flex p-2 justify-between items-center">
        <button
          onClick={Like}
          className={`flex cursor-pointer ${
            Liked ? "bg-yellow-600 text-white" : "bg-white"
          } justify-center items-center py-2 px-4 w-[30%] border border-solid border-gray-300 rounded-xl`}
        >
          {Liked ? <IoThumbsUpSharp /> : <IoThumbsUpOutline />}
          {Liked ? (
            <span className="sm:block hidden">Liked</span>
          ) : (
            <span className="sm:block hidden">Like</span>
          )}
        </button>
        <button
          onClick={() => {
            if (!isDetailPost) {
              navigate(`/post/${data._id}`);
            }
          }}
          className={`flex cursor-pointer  justify-center items-center py-2 px-4 w-[30%] border border-solid border-gray-300 rounded-xl`}
        >
          <IoChatbubblesOutline />
          <span className="sm:block hidden">Comments</span>
        </button>
        <button
          onClick={Save}
          className={`flex cursor-pointer ${
            Saved ? "bg-orange-700 text-white" : "bg-white"
          } justify-center items-center py-2 px-4 w-[30%] border border-solid border-gray-300 rounded-xl`}
        >
          {Saved ? <IoBookmarkSharp /> : <IoBookmarkOutline />}
          {Saved ? (
            <span className="sm:block hidden">Saved</span>
          ) : (
            <span className="sm:block hidden">Save</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
