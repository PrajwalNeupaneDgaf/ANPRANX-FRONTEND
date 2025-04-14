import React from "react";
import Layout from "../Layout/Layout";
import HomePost from "../Components/HomePost";
import PostCard from "../Components/PostCard";

const Home = () => {
  return (
    <Layout bg={'bg-gray-100'}>
      <div className="max-w-[70rem] md:pt-3 pt-1 pb-32 bg-gray-100 mx-auto flex gap-3 flex-col">
        <HomePost />

      {/* Posts here  */}

      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>


        {/* Reload Button  */}
        <div className="pt-32 flex justify-center items-center">
          <button className="font-semibold shadow-lg bg-amber-500 text-gray-200 cursor-pointer min-w-[13rem] py-2 rounded-2xl">
            Refresh
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
