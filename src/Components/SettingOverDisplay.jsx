import React from "react";
import { IoClose } from "react-icons/io5";

const SettingOverDisplay = ({
  children,
  setDisplay,
  Header,
  Display,
  showHeader = true,
}) => {
  return (
    Display && (
      <div
        onClick={() => {
          setDisplay(false);
        }}
        className="fixed inset-0 bg-[#00000052] flex justify-center items-center  px-3 z-50"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-gray-50 shadow-xl max-h-[90dvh] relative noScrollBar overflow-x-scroll w-full md:w-[30rem] p-2 rounded px-2 py-2 pb-4"
        >
          { showHeader &&
            <div className="flex justify-between py-1 px-3 ">
              <strong className="text-gray-700 font-semibold text-sm md:text-lg">
                {Header}
              </strong>
              <IoClose
                className="my-auto cursor-pointer"
                size={21}
                color="red"
                onClick={() => {
                  setDisplay(false);
                }}
              />
            </div>
          }
          <div className="p-2">{children}</div>
        </div>
      </div>
    )
  );
};

export default SettingOverDisplay;
