import React, { useState } from "react";
import {
  IoAccessibility,
  IoAdd,
  IoClose,
  IoPencilSharp,
  IoSend,
} from "react-icons/io5";
import { useData } from "../Context/DataContext";

const HomePost = () => {
  const { showToast } = useData();
  const [Post, setPost] = useState("");
  const [Image, setImage] = useState(null);
  const [IsPosting, setIsPosting] = useState(false);

  //functions below are dummy
  const PostThePost = () => {
    setIsPosting(true);

    setTimeout(() => {
      showToast({
        type: "success",
        message: "You Posted New Post",
      });
      setIsPosting(false);
    }, 2000);
  };
  return (
    <div className="w-full md:min-h-[18rem] transition-all duration-1000 p-4 mb-6 min-h-[12rem] bg-white rounded-2xl shadow-md md:shadow-lg">
      <div className="flex justify-between">
        <div className="w-full flex gap-1 md:gap-2 items-center">
          <img
            src="https://scontent.fbdp2-1.fna.fbcdn.net/v/t39.30808-6/471270892_1735936640313368_6666737061056396940_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFpvDfxpsRuC588YkiFOBLFVBEaOWBHz8JUERo5YEfPwga2ALnm1TvrTyJJcPD3PwuFTxNvGw9vcXXZVvb3nfDt&_nc_ohc=D-_nxyzdcYQQ7kNvwEMEWQy&_nc_oc=AdlTvXnTGxYk9Hy3tvDEx4i7aIw_pXf5H9sCNIDi3dkQq-VK3oCD4rLRzXhnnwHKcz__9H7usyKWWFKstCvvcWdV&_nc_zt=23&_nc_ht=scontent.fbdp2-1.fna&_nc_gid=wS5q-W7F0D1IieoZQlBy1A&oh=00_AfEEpC7zgrkPOUctEBAyVCIwTU_qaz0BBGIlc_19EoWITg&oe=6802ACE7"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-400 object-cover"
            alt="Error"
          />

          <strong className="font-semibold text-sm cursor-pointer hover:underline select-none pb-3 md:text-lg text-yellow-700">
            Prajwal Neupane
          </strong>
        </div>

        {/* Add Image  */}
        <div>
          {Image ? (
            <button
              onClick={() => {
                setImage(null);
              }}
              className=" text-xs md:text-sm flex justify-center items-center gap-1 px-3 py-1 cursor-pointer text-yellow-500 hover:text-red-600 transition-all duration-300"
            >
              Cancel <IoClose />
            </button>
          ) : (
            <button
              onClick={() => {
                setImage("apple");
              }}
              className="flex text-yellow-800 text-xs md:text-sm justify-center items-center cursor-pointer font-semibold"
            >
              <IoAdd />
              Image
            </button>
          )}
        </div>
      </div>
      <div className="h-full pt-2">
        <textarea
          value={Post}
          placeholder="Share Your Thought"
          onChange={(e) => {
            setPost(e.target.value);
          }}
          className="noScrollBar rounded-xl text-sm md:text-lg resize-none border-none outline-none h-[6rem] p-3 md:h-[10rem] w-full bg-gray-100"
        ></textarea>
      </div>
      <div className="flex justify-end items-center pt-2 px-2">
        <button
          onClick={PostThePost}
          className={`flex justify-center text-xs md:text-sm items-center gap-1 rounded w-[5rem] md:w-[7rem] py-1 text-gray-200  font-semibold ${
            IsPosting
              ? "bg-yellow-800 cursor-not-allowed"
              : "bg-yellow-600  cursor-pointer"
          } `}
        >
          <IoPencilSharp size={18} />{" "}
          <span>{IsPosting ? "Posting" : "Post"}</span>
        </button>
      </div>
      {Image && (
        <div className="flex justify-center flex-col items-start">
          <div className="w-36 h-48 rounded-xl bg-gray-200"></div>
        </div>
      )}
    </div>
  );
};

export default HomePost;
