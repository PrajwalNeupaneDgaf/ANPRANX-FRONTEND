import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../Components/PostCard";
import AddComment from "../Components/AddComment";
import SettingOverDisplay from "../Components/SettingOverDisplay";
import Comments from "../Components/Comments";
import toast from "react-hot-toast";
import instance from "../axios";
import LoadingComponent from "../Components/LoadingComponent";

const DetailsPost = () => {
  const { postId } = useParams();

  const [PostData, setPostData] = useState({});
  const [CommentsAll, setCommentsAll] = useState([]);
  const [Likes, setLikes] = useState([]);

  const [DisplayLikes, setDisplayLikes] = useState(false);

  const [Loading, setLoading] = useState(true)

  const navigate = useNavigate()
  

  useEffect(() => {
    fetchPost()
  }, [postId]);

  const fetchPost = async()=>{
    try {
      const data = await instance.get(`/post/get/${postId}`)
      setPostData(data.data)
      setLikes(data.data.data.Likes)
      setCommentsAll(data.data.data.Comments)
    } catch (error) {
      toast.error("Cant Get Post")
    }
    finally{
      setLoading(false)
    }
  }

  if(Loading) return <LoadingComponent/>
  return (
    <Layout bg="bg-gray-100">
      <PostCard
        data={PostData.data}
        FirstName={Likes[0]?.Name}
        Others={Likes?.length>1?Likes?.length-1:''}
        isDetailPost={true}
        showLikes={true}
        isProfile={false}
        setDisplayLikes={setDisplayLikes}
      />
      <AddComment setComments={setCommentsAll}/>

      {CommentsAll?.length == 0 && (
        <div className="h-40 text-gray-700 font-semi text-xl flex justify-center items-center ">
          !! No Comments !!
        </div>
      )}

      {
        CommentsAll?.map((itm,idx)=><Comments Comments={CommentsAll} setComments={setCommentsAll} data={itm} key={idx}/>)
      }

      <SettingOverDisplay
        showHeader={false}
        Display={DisplayLikes}
        setDisplay={setDisplayLikes}
        Header={"Likes"}
      >
        {Likes?.map((itm, idx) => {
            return (
              <div
                key={idx}
                onClick={()=>{
                  navigate(`/profile/${itm._id}`)
                }}
                className="flex flex-row gap-3 items-center my-2 bg-gray-100 rounded border border-solid p-2 border-gray-300"
              >
                <img
                  src={itm?.Profile}
                  alt="Name Error"
                  className="h-10 w-10 md:h-12 md:w-12 bg-gray-600 rounded-full shadow-xl obj-cover cursor-pointer"
                />
                <p className="text-sm md:text-[1.14rem] font-semibold text-orange-700 select-none cursor-default">
                 {itm?.Name}
                </p>
              </div>
            );
          })}
      </SettingOverDisplay>
    </Layout>
  );
};

export default DetailsPost;
