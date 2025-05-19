import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import LoadingComponent from "../Components/LoadingComponent";
import { io, Socket } from "socket.io-client";
import instance from "../axios";
import { toast } from "react-hot-toast";

import imageCompression from "browser-image-compression"; //compress the image

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const userContext = createContext();

const UserContext = ({ children }) => {
  const [Loading, setLoading] = useState(true);

  //user Authorizations
  const [User, setUser] = useState({});
  const [IsAuthorized, setIsAuthorized] = useState(false);

  const [SentRequests, setSentRequests] = useState([]);
  const [Requests, setRequests] = useState([]);
  const [Friends, setFriends] = useState([]);
  const [ChatList, setChatList] = useState([]);

  useEffect(() => {
    instance
      .get("/user/me")
      .then((res) => {
        setIsAuthorized(true);
        const data = res.data.User;
        setUser(data);
        setSentRequests(data?.SentRequest);
        setRequests(data?.ReceivedRequest);
        setFriends(data?.Friends);
        setIsAuthorized(true);
      })
      .catch((err) => {
        setIsAuthorized(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [IsAuthorized]);

  const [Messages, setMessages] = useState([]);
  const [Notifications, setNotifications] = useState([]);
  const [Posts, setPosts] = useState([]);

  //https://anprax-backend.onrender.com

  const socketFunction = useCallback(
    () =>
      io(
        import.meta.env.VITE_MODE !== "DEVELOPMENT"
          ? "https://anprax-backend.onrender.com"
          : "http://localhost:5000",
        {
          query: {
            id: User?._id,
          },
        }
      ),
    [IsAuthorized]
  );

  const socket = socketFunction();

  useEffect(() => {
    socket?.on("Request:Received", handleRequestReceived);
    socket?.on("Request:Accepted", handleRequestAccepted);
    socket?.on("New:Message", handleNewMessage);
    socket?.on("New:Notification", handleNotificationReceived);

    return () => {
      socket?.off("Request:Received", handleRequestReceived);
      socket?.off("Request:Accepted", handleRequestAccepted);
      socket?.off("New:Message", handleNewMessage);
      socket?.off("New:Notification", handleNotificationReceived);
    };
  }, [socket]);

  const handleRequestReceived = useCallback(
    ({ me }) => {
      toast("Request Received");
      setRequests((p) => [...p, me]);
    },
    [socket]
  );
  const handleNotificationReceived = useCallback(
    ({ data }) => {
      toast(data);
    },
    [socket]
  );
  const handleNewMessage = useCallback(
    ({ newMessage }) => {
      toast("Message Received");
      setMessages((p) => [...p, newMessage]);
    },
    [socket]
  );

  const handleRequestAccepted = useCallback(
    ({ User }) => {
      toast(User?.Name + " Accepted Your Request");
      setFriends((p) => [...p, User]);
    },
    [socket]
  );

  const cancelrequest = (id, setLoader, setUnfriend) => {
    setLoader(true);
    instance
      .get(`/friend/cancel-request/${id}`)
      .then((res) => {
        toast.success("Request Canceled");
        let req = [];
        req = SentRequests.filter((itm) => itm?._id !== id);
        setSentRequests(req);
        if (setUnfriend) {
          setUnfriend(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error Canceling");
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const ManageRequest = (id, isAccepted, setLoader) => {
    setLoader(true);
    instance
      .post(`/friend/manage-request/${id}`, { isAccepted })
      .then((res) => {
        toast.success(res.data.message || "Request Handeled");
        let newReq = Requests.filter((itm) => itm._id !== id);
        setRequests(newReq || []);
        setFriends((p) => [...p, res.data.data]);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error Handeling");
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const UnfriendUser = (id, setIsFriend) => {
    instance
      .get(`/friend/unfriend/${id}`)
      .then((res) => {
        toast.success(res.data.message || "Unfriend SuccesFull");
        let newfriends = Friends.filter((itm) => itm?._id !== id);
        setFriends(newfriends);
        setIsFriend(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error Handeling");
        console.log(err);
      });
  };

  const BlockUser = (id) => {
    instance
      .get(`/friend/block-user/${id}`)
      .then((res) => {
        toast.success(res.data.message || "Block SuccesFull");
        let newfriends = Friends.filter((itm) => itm?._id !== id);
        setFriends(newfriends);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error Handeling");
      });
  };
  const UnBlockUser = (id, setLoader) => {
    setLoader(true);
    instance
      .get(`/friend/unblock-user/${id}`)
      .then((res) => {
        toast.success(res.data.message || "UnBlock SuccesFull");
        setUser((p) => ({
          ...p,
          Blocks: p.Blocks.filter((block) => block._id !== id),
        }));
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error Handeling");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const timeAgo = (createdAt) => {
    return dayjs(createdAt).fromNow(); // e.g., "3 minutes ago", "2 months ago"
  };

  const deleteAllMessage = (id) => {
    instance
      .delete(`/message/delete-message/${id}`)
      .then((res) => {
        toast.success(res.data.message || "Delete SuccesFull");
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error Handeling");
      });
  };

  const CompressedImage = async (image) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(image, options);

      return compressedFile;
    } catch (error) {
      toast.error("Failed Compression");
      return null;
    }
  };

  if (Loading) return <LoadingComponent />;
  return (
    <userContext.Provider
      value={{
        User,
        setUser,
        IsAuthorized,
        setIsAuthorized,
        Requests,
        SentRequests,
        Friends,
        setSentRequests,
        Messages,
        setMessages,
        ChatList,
        setChatList,
        timeAgo,
        CompressedImage,

        cancelrequest,
        ManageRequest,
        UnfriendUser,
        BlockUser,
        UnBlockUser,
        deleteAllMessage,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContext;

export const useUser = () => {
  return useContext(userContext);
};
