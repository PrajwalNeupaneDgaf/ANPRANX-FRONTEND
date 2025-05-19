import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import HomePost from "../Components/HomePost";
import PostCard from "../Components/PostCard";
import ProfileComp from "../Components/ProfileComp";
import instance from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../Components/LoadingComponent";
import {toast} from 'react-hot-toast'

const Profile = () => {
  const [IsOwnProfile, setIsOwnProfile] = useState(false);
  const [IsFriend, setIsFriend] = useState(false);
  const [IsRequested, setIsRequested] = useState(false);
  const [IsRequestReceived, setIsRequestReceived] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [data, setdata] = useState({});

  const Navigate = useNavigate()

  const { id } = useParams();

  useEffect(() => {
    instance
      .get(`/user/get-profile/${id}`)
      .then((res) => {
        let data = res.data;
        setdata(data?.Data);
        console.log(data.Data)
        setIsOwnProfile(data.isMineId);
        setIsRequestReceived(data?.isReceivedRequest);
        setIsRequested(data?.isRequested);
        setIsFriend(data?.isfriends);
      })
      .catch((err) => {
        toast.error(err.response.data.message ||'NO User Found')
        Navigate('/')
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (Loading) return <LoadingComponent />;

  return (
    <Layout bg="bg-gray-100">
      <ProfileComp
        data={data}
        IsMineProfile={IsOwnProfile}
        IsFriend={IsFriend}
        IsRequested={IsRequested}
        IsRequestReceived={IsRequestReceived}
        setterFunction={{
          setIsFriend,setIsRequestReceived,setIsRequested
        }}
      />
      {IsOwnProfile && <HomePost />}
      {data?.Posts?.map((itm, idx) => {
       return <PostCard isProfile={IsOwnProfile} data={itm} key={idx} />;
      })}
      {data?.Posts?.length <= 0 && (
        <div className=" h-64 flex w-full text-center justify-center items-center text-gray-600 font-semibold text-xl">
          <span>!! NO POSTS !!</span>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
