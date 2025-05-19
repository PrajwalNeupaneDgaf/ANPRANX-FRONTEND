import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { IoCheckmarkDone } from "react-icons/io5";
import NotificationCard from "../Components/NotificationCard";
import instance from "../axios";
import toast from "react-hot-toast";
import LoadingComponent from "../Components/LoadingComponent";

const Notification = () => {
  const [Notifications, setNotifications] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get("/notification/get-all")
      .then((res) => {
        const data = res.data;
        setNotifications(data.data);
      })
      .catch((err) => {
        toast.error(
          err.response.data.message || "Failed to fetch notfication "
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const checkAll = async()=>{
    try {
      await instance.get('/notification/mark-all-as-read')
      console.log('here')
      let newNotifications = Notifications.map((itm)=> {
       return {...itm,Isread:true}
      })
      setNotifications(newNotifications)
    } catch (error) {
      toast.error("Failed to Mark all As read")
    }
  }

  if (Loading) return <LoadingComponent />;

  return (
    <Layout bg="bg-gray-100">
      <div className="bg-white rounded-xl p-3 my-1 md:my-2 pb-12 shadow-xl h-[83dvh] overflow-hidden md:h-[87dvh]">
        <div className="flex justify-between items-center">
          <strong className="text-gray-700 text-lg md:text-xl select-none">
            Notifications
          </strong>

          <button onClick={()=>{checkAll()}} className="flex text-sm justify-center py-1 px-3 border rounded border-solid border-gray-200 items-center cursor-pointer text-yellow-700 font-semibold">
            Mark Checked <IoCheckmarkDone size={19} />
          </button>
        </div>
        <hr className="mt-3 border border-solid border-gray-400" />
        <div className="flex flex-col  h-full overflow-y-scroll noScrollBar">
          {Notifications.length == 0 && (
            <div className="text-xl md:text-2xl font-semibold text-gray-600 h-full w-full flex justify-center-safe items-center-safe">
              NO NOTIFICATIONS !!
            </div>
          )}
          {
            Notifications?.map((itm,idx)=><NotificationCard key={idx} data={itm}/>)
          }
        </div>
      </div>
    </Layout>
  );
};

export default Notification;
