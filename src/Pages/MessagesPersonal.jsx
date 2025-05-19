import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoClose,
  IoEllipsisVertical,
  IoReloadOutline,
  IoSendSharp,
  IoTrash,
} from "react-icons/io5";
import MessageBar from "../Components/MessageBar";
import instance from "../axios";
import { useUser } from "../Context/UserContext";
import toast from "react-hot-toast";
import Dialog from "../Components/Dialog";

const MessagesPersonal = () => {
  const Navigate = useNavigate();

  const MessageBox = useRef();

  const { id } = useParams();

  const [Message, setMessage] = useState("");

  const { Messages, setMessages, User } = useUser();

  const [data, setData] = useState({});

  const [showDeleteInfo, setshowDeleteInfo] = useState(false);

  useEffect(() => {
    instance
      .get(`/message/get-message/${id}`)
      .then((res) => {
        const data = res.data;
        setMessages(data?.messages);
        setData({
          User: data.User,
          isActive: data.IsActive,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Failed Fetching mesages");
        console.log(err);
      });
  }, [id]);

  const [LoadingMessage, setLoadingMessage] = useState(false);

  const SendMessage = () => {
    setLoadingMessage(true);
    instance
      .post(`/message/send-message/${data.User?._id}`, { Text: Message })
      .then((res) => {
        setMessages((p) => [
          ...p,
          {
            Message: Message,
            Sender: User._id,
            DeletedBy: [],
          },
        ]);
        setMessage("");
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Failed Sending");
      })
      .finally(() => {
        setLoadingMessage(false);
      });
  };

  useEffect(() => {
    if (MessageBox?.current) {
      MessageBox.current.scrollTop = MessageBox.current.scrollHeight;
    }
  }, [Messages]);

  const [ShowDeleteDialog, setShowDeleteDialog] = useState(false)

  const DeleteAllChat = ()=>{
    setshowDeleteInfo(false)
    instance.delete(`/message/delete-message/${id}`)
    .then((res)=>{
      console.log(res.data)
      setMessages([])
    })
    .catch((err)=>{
      toast.error(err.response.data.message || "Failed Delete Chats")
    })
  }


  return (
    <Layout bg="bg-gray-100">
      <div className="bg-white p-3 rounded-lg shadow-xl mt-2 h-[83dvh] md:h-[89dvh] overflow-hidden relative">
        <div className="flex justify-between items-center relative">
          <div className="flex gap-1 items-center">
            <img
              onClick={() => {
                Navigate(`/profile/${data.User?._id}`);
              }}
              src={data?.User?.Profile}
              alt={data.User?.Name}
              className="md:h-14 md:w-14 h-11 w-11 rounded-full bg-gray-700 cursor-pointer object-cover"
            ></img>
            <div className="gap-0 flex flex-col">
              <h2 className="font-semibold text-sm md:text-lg  text-orange-800 select-none cursor-default">
                {data.User?.Name}
              </h2>
              <p className="text-xs font-thin text-gray-700">
                {data.isActive ? "Active Now" : ""}
              </p>
            </div>
          </div>
          <div>
            {showDeleteInfo ? (
              <IoClose
                onClick={() => {
                  setshowDeleteInfo(false);
                }}
                className="cursor-pointer"
              />
            ) : (
              <IoEllipsisVertical
                onClick={() => {
                  setshowDeleteInfo(true);
                }}
                className="cursor-pointer"
              />
            )}
          </div>
          {showDeleteInfo && (
            <div className="bg-gray-100 rounded border border-solid border-gray-300 shadow-xl md:p-4 p-2 absolute -top-1 right-8">
              <button onClick={()=>{
                setShowDeleteDialog(true)
              }} className="flex justify-center items-center p-1 px-5 text-red-500 border border-gray-200 border-solid rounded cursor-pointer hover:text-red-700">
                Delete All <IoTrash />{" "}
              </button>
            </div>
          )}
        </div>
        <hr className="mt-3 border border-solid border-gray-400" />
        <div
          ref={MessageBox}
          className="h-[80%]  overflow-y-scroll noScrollBar"
        >
          {Messages?.map((itm, idx) => {
            return <MessageBar data={itm} key={idx} />;
          })}
          {Messages.length == 0 && (
            <div className="h-full w-full flex justify-center items-center">
              <h2 className="font-semibold text-gray-700 text-xl">
                !!NO MESSAGES START NEW!!
              </h2>
            </div>
          )}
        </div>
        <div className="mt-2 border border-solid border-gray-400 w-full px-2 rounded-2xl flex justify-between items-center">
          <input
            onKeyDown={(e) => {
              if (Message && e.key == "Enter") {
                SendMessage();
              }
            }}
            type="text"
            value={Message}
            placeholder="Your Message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="w-[85%] md:w-[90%] h-10 border-none outline-none text-gray-800 text-sm md:text-lg"
          />
          {LoadingMessage ? (
            <IoReloadOutline
              className="animate-spin duration-700"
              size={"1.6rem"}
            />
          ) : (
            <IoSendSharp
              onClick={() => {
                if (Message) {
                  SendMessage();
                }
              }}
              size={"1.6rem"}
            />
          )}
        </div>
      </div>
     {
      ShowDeleteDialog &&  <Dialog Reject={()=>{
        setshowDeleteInfo(false)
      }} setDisplay={setShowDeleteDialog} Accept={DeleteAllChat} Description={'Your Chats will be deleted but still they can see your chats , if they haven`t deleted Yet'} Title={`Delete Chats With ${data?.User.Name}`}/>
     }
    </Layout>
  );
};

export default MessagesPersonal;
