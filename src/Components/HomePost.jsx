import React, { useRef, useState } from "react";
import {
  IoAccessibility,
  IoAdd,
  IoClose,
  IoPencilSharp,
  IoSend,
} from "react-icons/io5";
import { useData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import instance from "../axios";
import toast from "react-hot-toast";

const HomePost = () => {
  const { showToast } = useData();
  const [Post, setPost] = useState("");
  const [Image, setImage] = useState(null);
  const [IsPosting, setIsPosting] = useState(false);

  const [ImageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const { User,CompressedImage } = useUser();

  const ImageRef = useRef();

  //functions below are dummy
  const PostThePost = async() => {
    if (!Image && !Post) {
      return;
    }
    setIsPosting(true);
    const formData = new FormData();

    if (Image) {
      const reqImage = await CompressedImage(Image)
      formData.append("image", reqImage);
    }
    if (Post) {
      formData.append("Text", Post);
    }

    instance
      .post("/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast("Post Added SuccesFully");
        setImage(null)
        setImageUrl(null)
        setPost('')
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Post Failed");
      })
      .finally(() => {
        setIsPosting(false);
      });
  };
  return (
    <div className="w-full md:min-h-[18rem] transition-all duration-1000 p-4 mb-6 min-h-[12rem] bg-white rounded-2xl shadow-md md:shadow-lg">
      <div className="flex justify-between">
        <div
          onClick={() => {
            navigate(`/profile/${User?._id}`);
          }}
          className="w-full flex gap-1 md:gap-2 items-center"
        >
          {User.Profile ? (
            <img
              src={User?.Profile}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-400 object-cover"
              alt={User?.Name}
            />
          ) : (
            <div className="bg-conic-210 from-orange-300  via-orange-700 to-orange-800 rounded-full w-10 h-10 md:w-14 md:h-14 cursor-pointer"></div>
          )}

          <strong className="font-semibold text-sm cursor-pointer hover:underline select-none pb-3 md:text-lg text-yellow-700">
            {User?.Name}
          </strong>
        </div>

        {/* Add Image  */}
        <div>
          {Image ? (
            <button
              onClick={() => {
                setImage(null);
                setImageUrl(null)
                ImageRef.current.value = null
              }}
              className=" text-xs md:text-sm flex justify-center items-center gap-1 px-3 py-1 cursor-pointer text-yellow-500 hover:text-red-600 transition-all duration-300"
            >
              Cancel <IoClose />
            </button>
          ) : (
            <button
              onClick={() => {
                ImageRef.current.click();
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
      <input
        ref={ImageRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          setImage(file); // save the file
          setImageUrl(URL.createObjectURL(file)); // create preview URL
        }}
        className="hidden"
      />
      {Image && ImageUrl && (
        <div className="flex justify-center flex-col items-start">
          <img
            src={ImageUrl}
            className="w-36 h-48 rounded-xl bg-gray-200"
          ></img>
        </div>
      )}
    </div>
  );
};

export default HomePost;
