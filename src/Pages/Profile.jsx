import React, { useState } from "react";
import Layout from "../Layout/Layout";
import HomePost from "../Components/HomePost";
import PostCard from "../Components/PostCard";
import ProfileComp from "../Components/ProfileComp";

const Profile = () => {
    const [IsOwnProfile, setIsOwnProfile] = useState(true)
    const[showPhotos,setShowPhotos] = useState(false)
  return(
  <Layout bg="bg-gray-100">
   <ProfileComp/>
   { IsOwnProfile &&
     <HomePost/>
   }
   {
    showPhotos?"":<PostCard/>
   }

  </Layout>
  )
};

export default Profile;
