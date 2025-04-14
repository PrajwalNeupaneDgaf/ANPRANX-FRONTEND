import React from "react";
import { IoClose } from "react-icons/io5";

const Dialog = ({ Title, Description, Accept, Reject, setDisplay }) => {
  return (
    <div
      onClick={() => {
        setDisplay(false);
        Reject()
      }}
      className="fixed z-40 inset-0 flex justify-center pt-[7vh] bg-[#0000005b]"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative w-full flex  min-h-[10rem] h-fit flex-col gap-2 md:w-[30rem] shadow-3xl rounded-lg border border-solid border-gray-500 p-3 md:p-6 bg-white "
      >
        <h2 className="md:text-xl text-lg text-gray-800 font-semibold text-center">
          {Title}
        </h2>
        <p className="text-xs md:text-sm font-light text-gray-700 text-justify">
          {Description}
        </p>
        <div className="flex justify-end items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDisplay(false);
              Reject();
            }}
            className="w-[8rem] py-1  font-semibold text-white justify-center items-center flex hover:bg-gray-800 bg-gray-700 cursor-pointer"
          >
            Reject
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDisplay(false);
              Accept();
            }}
            className="w-[8rem] py-1 font-semibold text-white justify-center items-center flex hover:bg-yellow-800 bg-yellow-700 cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
