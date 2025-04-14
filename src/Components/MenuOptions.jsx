import React from "react";
import { IoArrowForward } from "react-icons/io5";

const MenuOptions = () => {
  return (
    <div>
        {/* Managge Notification  */}
      <div className="border rounded border-solid border-gray-200 px-3 py-7 text-sm md:text-[1em] font-light w-full text-center flex justify-center flex-col gap-5 items-center cursor-pointer my-1 md:my-2">
        <p className="w-full text-center">
        !! Your Email Is Not Verified Verify It For ,Password managing and Many other.!!
        </p>
        <button className="text-yellow-700 font-semibold select-none cursor-pointer border-solid border-gray-500 p-2 px-6 hover:border rounded">
            Verify Now
        </button>
      </div>



      <div className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2">
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          Manage Passwords
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
      <div className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2">
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          Edit General Info
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
      <div className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2">
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          Change Your Email
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
      <div className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2">
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          Verify Email
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
      <div className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2">
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          Person You Blocked
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
    </div>
  );
};

export default MenuOptions;
