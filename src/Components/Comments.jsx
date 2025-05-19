import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import Dialog from "./Dialog";
import toast from "react-hot-toast";
import instance from "../axios";

const Comments = ({data,setComments ,Comments }) => {
  const Navigate = useNavigate()

  const {User} = useUser()


  const {postId} = useParams()
  const [isDelete, setisDelete] = useState(false)

  const DeleteComment = async ()=>{
    try {
      await instance.delete(`/post/delete-comment/${postId}/${data._id}`)
      toast.success('Comment Deleted')
      let newComments = Comments.filter(itm=>itm._id!==data._id)
      setComments(newComments)
    } catch (error) {
      toast.error(error.response.data.message||'Sorry Delete Failed')
    }
  }
  return (
    <div id={data._id} className="flex flex-row gap-2 p-2 shadow-lg rounded bg-gray-50 my-2">
      <img
        onClick={()=>{
          Navigate(`/profile/${data.User?._id}`)
        }}
        src={data?.User?.Profile}
        alt={data?.User?.Name}
        className="object-cover bg-gray-700 rounded-full h-10 w-10 md:h-12 md:w-12 cursor-pointer"
      />
      <div className="flex-1 flex flex-col">
        <h2 className="cursor-default select-none text-sm md:text-[.99rem] font-semibold text-orange-700">
         {data?.User?.Name}
        </h2>
        <p className="text-sm text-gray-800 font-[1.2rem]">
          {data?.Text}
        </p>
       {User._id==data.User._id?
         <div className="flex justify-end px-2">
            <button onClick={()=>{
              setisDelete(true)
            }} className="px-4 cursor-pointer hover:underline text-orange-600 font-semibold">Delete</button>
        </div>:''
       }
      </div>
      {isDelete &&
      <Dialog setDisplay={setisDelete} Title={"Delete The Comment"} Accept={DeleteComment} Description={`Do you want to delete your ${data?.Text} comment on this post`}/>
      }
    </div>
  );
};

export default Comments;
