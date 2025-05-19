import React, { useRef, useState } from "react";
import Dialog from "./Dialog";
import { useData } from "../Context/DataContext";
import { IoIosMale } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import { FaTransgenderAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SettingOverDisplay from "./SettingOverDisplay";
import instance from "../axios";

import {toast} from 'react-hot-toast'
import { useUser } from "../Context/UserContext";

const ProfileComp = ({
  IsMineProfile,
  IsRequested,
  data,
  IsFriend,
  IsRequestReceived,
  setterFunction
}) => {
  const [showOptions, setshowOptions] = useState(false);
  const [DisplayBlocked, setDisplayBlocked] = useState(false);
  const [DisplayUnfriend, setDisplayUnfriend] = useState(false);


  const [ShowRemoveProfile, setShowRemoveProfile] = useState(false)

  const [showImageAdd, setshowImageAdd] = useState(false);



  const [Image, setImage] = useState(null);
  const [URI, setURI] = useState("");

  const navigate = useNavigate();

  const imageRef = useRef();


  const {UnfriendUser,cancelrequest, setSentRequests,BlockUser,CompressedImage} = useUser()


  const [ImageUploading, setImageUploading] = useState(false)
  const [ImageRemoving, setImageRemoving] = useState(false)

  const [IsRequestCanceling, setIsRequestCanceling] = useState(false)

  const AddImage = async  ()=>{
    if(!Image && ImageUploading){
      return
    }
    setImageUploading(true)

    const form = new FormData()
    const imageWeNeed = await CompressedImage(Image)
    form.append('Image',imageWeNeed)

    instance.post('/user/add-photo',form,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }).then(()=>{
      location.reload()
    }).catch((err)=>{
      toast.error(err.response.data.message || "Something Went Wrong")
    }).finally(()=>{
      setImageUploading(false)
    })
  }

  const DeleteProfile = ()=>{
    setImageRemoving(true)
    instance.delete('/user/remove-profile')
    .then(()=>{
      toast.success("Image removed SuccesFully")
      location.reload()
    }).catch(err=>{
      toast.error(err.response.data.message || "Some error occured")
    })
    .finally(()=>{
      setImageRemoving(false)
    })
  }

  const [requestSending, setrequestSending] = useState(false)


  const addFriend = ()=>{
    setrequestSending(true)
    instance.get(`/friend/send-request/${data?._id}`)
    .then((res)=>{
      toast.success(res.data.message || "Request Sent ")
      setterFunction.setIsRequested(true)
      setSentRequests(p=>[...p,data])      
    }).catch(err=>{
      toast.error(err.response.data.message || "Failed Send request")
    }).finally(()=>{
      setrequestSending(false)
    })
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white my-2 rounded-2xl shadow-xl p-1 py-4 pb-8">
      <div className="flex justify-center items-center flex-col">
        <div className="rounded-full h-64 w-64 bg-gray-500 overflow-hidden border-2 border-solid border-orange-400">
          {data?.Profile ? (
            <img
              src={data.Profile}
              alt={data?.Name}
              className="h-ful w-full object-cover"
            />
          ) : (
            <div className="bg-conic-210 from-orange-300  via-orange-700 to-orange-800 h-full w-full cursor-pointer"></div>
          )}
        </div>
        <h1 className="text-gray-800 font-semibold text-lg md:text-xl mb-3 flex flex-row justify-center items-center gap-1">
          {data?.Name}{" "}
          {data?.Gender == "Male" ? (
            <IoIosMale />
          ) : data?.Gender == "Female" ? (
            <IoFemale />
          ) : (
            <FaTransgenderAlt />
          )}
        </h1>
        <h1 className="text-gray-800 font-semibold text-xs md:text-sm mb-3">
          @{data?.UserName}
        </h1>
        {!IsMineProfile ? (
          <div className="flex flex-wrap justify-center items-center gap-2">
            {!IsRequested && !IsFriend && !IsRequestReceived && (
              <button onClick={addFriend} className="text-gray-100 bg-gray-800 p-1 cursor-pointer rounded-sm w-[13rem] ">
                {requestSending?"Sending...":"AddFriend"}
              </button>
            )}
            {IsRequested && (
              <button onClick={()=>{
                cancelrequest(data?._id , setIsRequestCanceling, setterFunction.setIsRequested)
              }} className="text-gray-100 bg-gray-700 p-1 cursor-pointer rounded-sm w-[13rem] ">
              {IsRequestCanceling?"Cancelng...":"Cancel Request"}
              </button>
            )}
            {IsFriend && (
              <button
                onClick={() => {
                  setshowOptions(true);
                }}
                className="text-gray-100 bg-gray-700 p-1 cursor-pointer rounded-sm w-[13rem] "
              >
                Manage Friends
              </button>
            )}
            {IsRequestReceived && (
              <button
                onClick={() => {
                  navigate("/requests");
                }}
                className="text-gray-100 bg-gray-700 p-1 cursor-pointer rounded-sm w-[13rem] "
              >
                Manage Request
              </button>
            )}
            <button onClick={()=>{
              navigate(`/messages/${data?._id}`)
            }} className="text-gray-100 bg-gradient-to-r from-orange-400 to-orange-600 p-1 cursor-pointer rounded-sm w-[13rem] ">
              Message
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => {
                if(!ImageUploading || !ImageRemoving){
                  setshowImageAdd(true);
                }
              }}
              className="text-gray-100 bg-gray-800 p-1 cursor-pointer rounded-sm w-[13rem] "
            >
             {ImageUploading?"Adding....":" Add Profile"}
            </button>
            <button onClick={()=>{
              if(!ImageRemoving || !ImageUploading ){
                setShowRemoveProfile(true)
              }
            }} className="text-gray-100 bg-gradient-to-r from-orange-400 to-orange-600 p-1 cursor-pointer rounded-sm w-[13rem] ">
              {ImageRemoving?"Removing..":"Remove Profile"}
            </button>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-600 px-2">Friends:</h2>
        <div className="flex justify-center items-center gap-3 flex-wrap pt-3 min-h-[8rem]">
          {data.Friends.slice(0, 15).map((itm, idx) => {
            return (
              <div key={idx} onClick={()=>{
                navigate(`/profile/${itm?._id}`)
              }}>
                <img src={itm?.Profile} alt={itm?.Name} className="h-14 w-14 rounded-full object-cover bg-gray-600 cursor-pointer"/>
              </div>
            );
          })}
          {data?.Friends.length <= 0 && (
            <h1 className="text-xl text-gray-600">!! No Friends !!</h1>
          )}
        </div>
      </div>
      {showOptions && (
        <div
          onClick={() => {
            setshowOptions(false);
          }}
          className="fixed inset-0 z-40 bg-[#00000034] flex justify-center items-center px-3"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white rounded p-4 w-[21rem] max-w-[96vw] flex justify-center items-center shadow-2xl flex-col gap-2"
          >
            <button
              onClick={() => {
                setshowOptions(false);
                setDisplayUnfriend(true);
              }}
              className="w-full p-2 bg-gray-600 rounded cursor-pointer  font-semibold text-gray-100"
            >
              Unfriend
            </button>
            <button
              onClick={() => {
                setshowOptions(false);
                setDisplayBlocked(true);
              }}
              className="w-full p-2 bg-orange-600 rounded cursor-pointer  font-semibold text-gray-100"
            >
              Block
            </button>
          </div>
        </div>
      )}

      {DisplayBlocked && (
        <Dialog
          setDisplay={setDisplayBlocked}
          Title={"Do You Want to Block"}
          Description={
            "The User Prajwal Neupane will be blocked . Are you sure you want to Block?"
          }
          Accept={() => {
            BlockUser(data?._id)
            setManageFriends(false);
          }}
          Reject={() => {
            setManageFriends(false);
          }}
        />
      )}
      {DisplayUnfriend && (
        <Dialog
          setDisplay={setDisplayUnfriend}
          Title={"Do You Want to Unfriend"}
          Description={
            "The User Prajwal Neupane will no more be Your Friend . Are you sure you want to unfriend?"
          }
          Accept={() => {
            UnfriendUser(data?._id ,setterFunction.setIsFriend)
            setManageFriends(false);
          }}
          Reject={() => {
            setManageFriends(false);
          }}
        />
      )}

      <SettingOverDisplay
        Display={showImageAdd}
        setDisplay={setshowImageAdd}
        Header={"Add New Image"}
      >
        {Image ? (
          <button
            onClick={() => {
              setImage(null);
              setURI("");
              imageRef.current.value = null;
            }}
            className="p-2 w-full bg-gradient-to-br from-orange-400 to-orange-600 font-semibold text-white cursor-pointer"
          >
            Remove Image
          </button>
        ) : (
          <button
            onClick={() => {
              imageRef.current.click();
            }}
            className="w-full p-2 bg-gradient-to-br from-orange-400 to-orange-600 font-semibold text-white cursor-pointer"
          >
            Add Image
          </button>
        )}
        <div>
          <input
            ref={imageRef}
            id="imageAdd"
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
                setURI(URL.createObjectURL(file));
              }
            }}
            className="hidden"
          />
        </div>
        <div>
          {Image && URI && (
            <div>
              <img
                src={URI}
                alt={"Image Name"}
                className="mt-3 h-52 rounded w-36 object-cover"
              />
              <button onClick={AddImage} className="bg-gradient-to-l from-gray-600 to-gray-900 text-white font-semibold my-2 w-full p-2 rounded cursor-pointer">
              { ImageUploading?"Uploading...":"Save"}
              </button>
            </div>
          )}
        </div>
      </SettingOverDisplay>

      { ShowRemoveProfile &&
        <Dialog Accept={DeleteProfile} Title={"Delete The Profile"} setDisplay={setShowRemoveProfile} Description={"Your Profile will be Removed and Set To Default One"}/>
      }
    </div>
  );
};

export default ProfileComp;
