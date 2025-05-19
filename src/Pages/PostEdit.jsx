import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout/Layout";
import { IoAdd, IoClose, IoPencilSharp, IoTrash } from "react-icons/io5";
import { useUser } from "../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../Components/LoadingComponent";
import instance from "../axios";
import toast from "react-hot-toast";
import Dialog from "../Components/Dialog";

const PostEdit = () => {
  const [Post, setPost] = useState("");
  const [Image, setImage] = useState(null);
  const [IsPosting, setIsPosting] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);

  const [ThisPost, setThisPost] = useState({});
  const [Loading, setLoading] = useState(true);

  const [RemoveImage, setRemoveImage] = useState(false);

  const [ImageURL, setImageURL] = useState("");

  const refImage = useRef();

  const { User,CompressedImage } = useUser();

  const { postId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get(`/post/get-for-update/${postId}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setThisPost(data.data);
        setImageURL(data.data.Image?.Link);
        setPost(data.data.Text);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error Fetching");
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  //Delete Post
  const [DeleteDialog, setDeleteDialog] = useState(false);
  const DeletePost = async () => {
    if (isDeleting) {
      return;
    }
    try {
      setisDeleting(true);
      const data = await instance.delete(`/post/delete-post/${postId}`);
      if (data) {
        toast(data.message || "Deleted");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message || "failed deleting");
    } finally {
    }
  };

  const SaveUpdate = async () => {
    if (IsPosting) {
      return;
    }
    if (!Post && !Image) {
      return;
    }
    try {
      setIsPosting(true);
      const formData = new FormData();

      if (Image) {
        const reqImage = await CompressedImage(Image)
        formData.append("image", reqImage);
      }
      if (Post) {
        formData.append("Text", Post);
      }
      formData.append("RemoveImage",RemoveImage)
      await instance.put(`/post/update/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Updated")
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Error Updating ")
    } finally {
      setIsPosting(false);
    }
  };

  if (Loading) return <LoadingComponent />;

  return (
    <Layout bg="bg-gray-100">
      <div className="w-full mt-2 md:min-h-[18rem] transition-all duration-1000 p-4 mb-6 min-h-[12rem] bg-white rounded-2xl shadow-md md:shadow-lg">
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
          <div className="flex flex-row gap-2 justify-center items-center">
            {Image ? (
              <button
                onClick={() => {
                  setImage(null);
                  setImageURL(ThisPost.HasImage ? ThisPost.Image?.Link : null);
                  refImage.current.value = null;
                }}
                className=" text-xs md:text-sm flex justify-center items-center gap-1 px-3 py-1 cursor-pointer text-yellow-500 hover:text-red-600 transition-all duration-300"
              >
                Cancel <IoClose />
              </button>
            ) : (
              <button
                onClick={() => {
                  refImage.current.click();
                }}
                className="flex text-yellow-800 text-xs md:text-sm justify-center items-center cursor-pointer font-semibold"
              >
                <IoAdd />
                {ThisPost.HasImage ? "Change" : "Image"}
              </button>
            )}

            {!Image && ThisPost.HasImage && (
              <button
                onClick={() => {
                  setRemoveImage(true);
                  setImageURL(null);
                }}
                className="text-xs md:text-sm p-1 px-3 cursor-pointer bg-red-700 rounded font-semibold text-gray-100"
              >
                Remove
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
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => {
                setDeleteDialog(true);
              }}
              className="flex flex-row cursor-pointer justify-center text-xs md:text-sm items-center gap-1 rounded w-[5rem] md:w-[7rem] py-1 text-gray-200 bg-red-700  font-semibold"
            >
              <IoTrash size={18} />
              {isDeleting ? " Deleting" : " Delete"}
            </button>
            <button
              onClick={SaveUpdate}
              className={`flex justify-center text-xs md:text-sm items-center gap-1 rounded w-[5rem] md:w-[7rem] py-1 text-gray-200  font-semibold ${
                IsPosting
                  ? "bg-yellow-800 cursor-not-allowed"
                  : "bg-yellow-600  cursor-pointer"
              } `}
            >
              <IoPencilSharp size={18} />{" "}
              <span>{IsPosting ? "Updatinging" : "Update"}</span>
            </button>
          </div>
        </div>
        {ImageURL && (
          <div className="flex justify-center flex-col items-start">
            <img
              src={ImageURL}
              alt="Error"
              className="w-36 h-48 rounded-xl bg-gray-200 object-cover"
            ></img>
          </div>
        )}
      </div>
      <input
        ref={refImage}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => {
          setRemoveImage(false);
          setImage(e.target.files[0]);
          setImageURL(URL.createObjectURL(e.target.files[0]));
        }}
      />

      {DeleteDialog && (
        <Dialog
          setDisplay={setDeleteDialog}
          Title={"Do You Want To Delete The Post."}
          Accept={DeletePost}
          Description={
            "Your Post and Image (if There) Will be Permanently Deleted"
          }
        />
      )}
    </Layout>
  );
};

export default PostEdit;
