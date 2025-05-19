import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import HomePost from "../Components/HomePost";
import PostCard from "../Components/PostCard";
import instance from "../axios";
import toast from "react-hot-toast";
import LoadingComponent from "../Components/LoadingComponent";

const Home = () => {
  const [Loading, setLoading] = useState(true);

  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    reloadPage()
  }, []);

  const reloadPage = () => {
    setLoading(true)
    instance
      .get("/post/home")
      .then((res) => {
        const data = res.data;
        setPosts(data)
      })
      .catch((err) => {
        toast.error(err.response?.data.message || "Error Fetching");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (Loading) return <LoadingComponent />;
  return (
    <Layout bg={"bg-gray-100"}>
      <div className="max-w-[70rem] md:pt-3 pt-1 pb-32 bg-gray-100 mx-auto flex gap-3 flex-col">
        <HomePost />

        {/* Posts here  */}
        {
          Posts?.map((itm , idx)=>{
            return <PostCard key={idx} data={itm}/>
          })
        }

        {/* Reload Button  */}
        <div className="pt-32 flex justify-center items-center">
          <button onClick={reloadPage} className="font-semibold shadow-lg bg-amber-500 text-gray-200 cursor-pointer min-w-[13rem] py-2 rounded-2xl">
            Refresh
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
