import React from "react";

const MessageBar = ({ data }) => {
  return (
    <div
      className={`my-2 w-full flex ${
        data.By == "You" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`w-[27rem] max-w-[90%] p-2 rounded ${
          data.By == "You" ? "bg-[#000000b6] text-white" : "bg-[#77766fb2]"
        }`}
      >
        <div className="text-xs md:text-sm">{data.Message}</div>
        <h5 className={`text-end font-thin text-xs ${data.By=='You'?'text-gray-100':"text-gray-800"}`}>
            3m ago
        </h5>
      </div>
    </div>
  );
};

export default MessageBar;
