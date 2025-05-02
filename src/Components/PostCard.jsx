import React, { useState } from "react";
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
  IoThumbsUpOutline,
  IoThumbsUpSharp,
  IoTrashBin,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PostCard = ({ isProfile }) => {

  const navigate = useNavigate()

  const [ShowInfo, setShowInfo] = useState(false);
  const [Liked, setLiked] = useState(false);
  const [Saved, setSaved] = useState(false);
  return (
    <div className="w-full md:min-h-[24rem] p-3 min-h-[18rem] bg-white rounded-2xl shadow-md md:shadow-lg relative">
      <div onClick={()=>{
        navigate(`/profile/800`)
      }} className="flex justify-between shadow-sm rounded-xl py-2">
        <div className="w-full flex gap-1 md:gap-2 items-center">
          <img
            src="https://scontent.fbdp2-1.fna.fbcdn.net/v/t39.30808-6/471270892_1735936640313368_6666737061056396940_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFpvDfxpsRuC588YkiFOBLFVBEaOWBHz8JUERo5YEfPwga2ALnm1TvrTyJJcPD3PwuFTxNvGw9vcXXZVvb3nfDt&_nc_ohc=D-_nxyzdcYQQ7kNvwEMEWQy&_nc_oc=AdlTvXnTGxYk9Hy3tvDEx4i7aIw_pXf5H9sCNIDi3dkQq-VK3oCD4rLRzXhnnwHKcz__9H7usyKWWFKstCvvcWdV&_nc_zt=23&_nc_ht=scontent.fbdp2-1.fna&_nc_gid=wS5q-W7F0D1IieoZQlBy1A&oh=00_AfEEpC7zgrkPOUctEBAyVCIwTU_qaz0BBGIlc_19EoWITg&oe=6802ACE7"
            alt="Error"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-400 object-cover"
          />

          <div className="flex flex-col gap-0">
            <strong className="font-semibold text-sm  md:text-lg select-none hover:underline cursor-pointer text-yellow-700">
              Prajwal Neupane
            </strong>
            <p className="text-xs text-gray-400">3 min ago</p>
          </div>
        </div>

        {/* Add Image  */}

        {isProfile && (
          <div
            onClick={() => {
              setShowInfo(true);
            }}
          >
            <IoEllipsisVerticalOutline
              className="cursor-pointer mt-2"
              size={18}
            />
          </div>
        )}
      </div>

      {ShowInfo && (
        <div className="min-h-16 w-[11rem] border border-solid border-gray-50 shadow-xl p-3 flex gap-4 flex-col bg-gray-100 absolute right-6 top-9 rounded-2xl z-20">
          <button className="flex text-xs md:text-sm gap-2 justify-center items-center hover:text-yellow-800 text-yellow-600 cursor-pointer rounded-lg">
            <span>
              <IoPencilSharp />
            </span>
            Edit Post
          </button>
          <button className="flex gap-2 text-xs md:text-sm  justify-center items-center hover:text-red-800 text-red-600 cursor-pointer rounded-lg">
            <IoTrashBin />
            Delete Post
          </button>
        </div>
      )}
      <div className="p-3 rounded mt-2 pt-2 text-sm md:text-lg font-[1.6rem]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quis
        dolores libero numquam minima. Sequi quidem eaque repellendus fugit
        excepturi!
      </div>

      <div className="min-h-[16rem] flex justify-center items-center py-4">
        <img
          src="https://scontent.fbdp2-1.fna.fbcdn.net/v/t39.30808-6/471270892_1735936640313368_6666737061056396940_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFpvDfxpsRuC588YkiFOBLFVBEaOWBHz8JUERo5YEfPwga2ALnm1TvrTyJJcPD3PwuFTxNvGw9vcXXZVvb3nfDt&_nc_ohc=D-_nxyzdcYQQ7kNvwEMEWQy&_nc_oc=AdlTvXnTGxYk9Hy3tvDEx4i7aIw_pXf5H9sCNIDi3dkQq-VK3oCD4rLRzXhnnwHKcz__9H7usyKWWFKstCvvcWdV&_nc_zt=23&_nc_ht=scontent.fbdp2-1.fna&_nc_gid=wS5q-W7F0D1IieoZQlBy1A&oh=00_AfEEpC7zgrkPOUctEBAyVCIwTU_qaz0BBGIlc_19EoWITg&oe=6802ACE7"
          alt=""
          className="bg-gray-400 object-cover min-h-[36rem] w-[100%] sm:w-[25rem]  rounded-2xl"
        />
      </div>

      {/* Reacts  */}
      <div className=" rounded-lg flex p-2 justify-between items-center">
        <button
          onClick={() => {
            setLiked(!Liked);
          }}
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
          onClick={() => {}}
          className={`flex cursor-pointer  justify-center items-center py-2 px-4 w-[30%] border border-solid border-gray-300 rounded-xl`}
        >
          <IoChatbubblesOutline />
          <span className="sm:block hidden">Comments</span>
        </button>
        <button
          onClick={() => {
            setSaved(!Saved);
          }}
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
