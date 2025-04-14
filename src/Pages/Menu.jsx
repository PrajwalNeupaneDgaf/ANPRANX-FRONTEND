import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { IoChevronForward, IoLogOut, IoLogOutOutline } from "react-icons/io5";
import Dialog from "../Components/Dialog";
import { useData } from "../Context/DataContext";
import MenuOptions from "../Components/MenuOptions";

const Menu = () => {
  const [Display, setDisplay] = useState(false);

  const { showToast } = useData();
  return (
    <Layout bg="bg-gray-100">
      <div className="my-1 md:my-2 bg-white shadow-xl rounded-xl p-3">
        <div className="flex gap-1 md:gap-2 justify-between items-center h-full ">
          <div className="flex gap-1 md:gap-2 items-center h-full">
            <div className="flex h-full justify-center items-center ">
              <img
                src="https://scontent.fbdp2-1.fna.fbcdn.net/v/t39.30808-6/471270892_1735936640313368_6666737061056396940_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFpvDfxpsRuC588YkiFOBLFVBEaOWBHz8JUERo5YEfPwga2ALnm1TvrTyJJcPD3PwuFTxNvGw9vcXXZVvb3nfDt&_nc_ohc=D-_nxyzdcYQQ7kNvwEMEWQy&_nc_oc=AdlTvXnTGxYk9Hy3tvDEx4i7aIw_pXf5H9sCNIDi3dkQq-VK3oCD4rLRzXhnnwHKcz__9H7usyKWWFKstCvvcWdV&_nc_zt=23&_nc_ht=scontent.fbdp2-1.fna&_nc_gid=wS5q-W7F0D1IieoZQlBy1A&oh=00_AfEEpC7zgrkPOUctEBAyVCIwTU_qaz0BBGIlc_19EoWITg&oe=6802ACE7"
                alt=""
                className="bg-gray-500 rounded-full w-12 h-12 md:w-18 md:h-18 cursor-pointer"
              />
            </div>
            <div>
              <strong className="text-[.8em] md:text-[1.20em] text-yellow-700 select-none">
                Prajwal Neupane
              </strong>
              <p className="text-yellow-700 select-none  hover:underline flex cursor-pointer font-semibold text-sm group">
                Visit Profile{" "}
                <span className="hidden group-hover:flex items-center">
                  <IoChevronForward />
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setDisplay(true);
            }}
            className="flex justify-center items-center gap-1 h-[38px] text-xs md:text-sm rounded-xl px-4 border border-solid border-gray-200 font-semibold  cursor-pointer text-yellow-700"
          >
            Logout <IoLogOutOutline size={19} />
          </button>
        </div>
        <hr className="mt-3 border border-solid border-gray-400" />
        <div className="py-3">
          <MenuOptions />
        </div>
      </div>

      {Display && (
        <Dialog
          setDisplay={setDisplay}
          Title={"Logout From This Session"}
          Accept={() => {
            showToast({
              message: "Logout Successfull",
            });
          }}
          Description={
            "You will be logout from this Session and redirected to login !"
          }
        />
      )}
    </Layout>
  );
};

export default Menu;
