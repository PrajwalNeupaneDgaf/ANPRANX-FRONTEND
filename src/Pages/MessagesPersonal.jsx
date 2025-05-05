import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { IoEllipsisVertical, IoSendSharp } from "react-icons/io5";
import MessageBar from "../Components/MessageBar";

const MessagesPersonal = () => {
  const Navigate = useNavigate();

  const MessageBox = useRef()

  const [Message, setMessage] = useState("");

  const [Messages, setMessages] = useState([])

  const SendMessage = ()=>{
    setMessages([...Messages,{
        Message,
        By:Messages.length%2==0?"You":'hot'
    }])
    setMessage('')
  }

  useEffect(()=>{
    MessageBox.current.scrollTop = MessageBox.current.scrollHeight;
  },[Messages])
  return (
    <Layout bg="bg-gray-100">
      <div className="bg-white p-3 rounded-lg shadow-xl mt-2 h-[83dvh] md:h-[89dvh] overflow-hidden relative">
        <div className="flex justify-between items-center ">
          <div className="flex gap-1 items-center">
            <div
              onClick={() => {
                Navigate(`/profile/123`);
              }}
              className="md:h-14 md:w-14 h-11 w-11 rounded-full bg-gray-700 cursor-pointer"
            ></div>
            <div className="gap-0 flex flex-col">
              <h2 className="font-semibold text-sm md:text-lg  text-orange-800 select-none cursor-default">
                Prajwal Neupane
              </h2>
              <p className="text-xs font-thin text-gray-700">Active Now</p>
            </div>
          </div>
          <div>
            <IoEllipsisVertical className="cursor-pointer"/>
          </div>
        </div>
        <hr className="mt-3 border border-solid border-gray-400" />
        <div ref={MessageBox} className="h-[80%]  overflow-y-scroll noScrollBar">
              {
                Messages?.map((itm,idx)=>{
                    return(
                       <MessageBar data={itm} key={idx}/>
                    )
                })
              }
              {
                Messages.length==0 &&
                <div className="h-full w-full flex justify-center items-center">
                    <h2 className="font-semibold text-gray-700 text-xl">
                        !!NO MESSAGES START NEW!!
                    </h2>
                </div>
              }
        </div>
        <div className="mt-2 border border-solid border-gray-400 w-full px-2 rounded-2xl flex justify-between items-center">
          <input
            onKeyDown={(e)=>{
                if(Message && e.key=="Enter"){
                    SendMessage()
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
          <IoSendSharp onClick={()=>{
           if(Message){
            SendMessage()
           }
          }} size={'1.6rem'}/>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPersonal;
