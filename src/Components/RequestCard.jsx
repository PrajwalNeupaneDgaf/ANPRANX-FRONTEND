import React from "react";

const RequestCard = () => {
  return (
    <div className="flex md:flex-row flex-col md:justify-between gap-2 p-2 my-2 border border-solid border-gray-200 rounded-xl">
      <div className="flex gap-1 md:gap-2  items-center h-full ">
        <div className="flex h-full justify-center items-center ">
          <img
            src="https://scontent.fbdp2-1.fna.fbcdn.net/v/t39.30808-6/471270892_1735936640313368_6666737061056396940_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFpvDfxpsRuC588YkiFOBLFVBEaOWBHz8JUERo5YEfPwga2ALnm1TvrTyJJcPD3PwuFTxNvGw9vcXXZVvb3nfDt&_nc_ohc=D-_nxyzdcYQQ7kNvwEMEWQy&_nc_oc=AdlTvXnTGxYk9Hy3tvDEx4i7aIw_pXf5H9sCNIDi3dkQq-VK3oCD4rLRzXhnnwHKcz__9H7usyKWWFKstCvvcWdV&_nc_zt=23&_nc_ht=scontent.fbdp2-1.fna&_nc_gid=wS5q-W7F0D1IieoZQlBy1A&oh=00_AfEEpC7zgrkPOUctEBAyVCIwTU_qaz0BBGIlc_19EoWITg&oe=6802ACE7"
            alt=""
            className="bg-gray-500 rounded-full w-9 h-9 md:w-12 md:h-12 object-cover cursor-pointer"
          />
        </div>
        <div>
          <strong className="text-sm md:text-[1.05em] text-yellow-700 select-none cursor-pointer hover:underline">
            Prajwal Neupane
          </strong>
        </div>
      </div>
      <div className="flex gap-2 px-4 items-center">
        <button className="w-[12rem] rounded py-1 md:py-2 bg-gray-700 hover:bg-gray-800 text-sm text-yellow-100 md:font-semibold cursor-pointer">
          Reject
        </button>
        <button className="w-[12rem] rounded py-1 md:py-2 text-gray-100 bg-yellow-700 text-sm hover:bg-yellow-800 md:font-semibold cursor-pointer">
          Accept
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
