import React from "react";
import { IoClose } from "react-icons/io5";

const Dialog = ({ Title, Description, Accept, Reject, setDisplay }) => {
  return (
    <div
      onClick={() => {
        setDisplay(false);
        Reject()
      }}
      className="fixed z-40 inset-0 flex justify-center pt-[7vh] bg-[#0000005b] px-3"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative w-full flex  h-fit flex-col gap-2 md:w-[30rem] shadow-3xl rounded-lg border border-solid border-gray-500 p-3 md:p-6 bg-white  py-4"
      >
        <h2 className="md:text-xl text-lg text-gray-800 font-semibold ">
          {Title}
        </h2>
        <p className="text-xs md:text-sm font-light text-gray-700 text-justify border border-solid min-h-[4rem] border-gray-300 bg-red-50 py-3 px-2 w-full rounded">
          {Description}
        </p>
        <div className="flex justify-end items-center gap-3 pt-4">
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
