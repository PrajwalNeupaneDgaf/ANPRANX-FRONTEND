import React from "react";
import { useUser } from "../Context/UserContext";
import BlockedUserCards from "../Components/BlockedUserCards";
import Layout from "../Layout/Layout";

const BlockedUser = () => {
  const { User } = useUser();
  return (
    <Layout>
      <h2 className="text-lg text-gray-500 my-3 font-semibold">
        Blocked Users
      </h2>
      {User?.Blocks?.length==0 &&
      <div className="flex justify-center items-center h-60 text-xl font-semibold text-gray-600 shadow bg-gray-50 borded-solid border border-gray-200 rounded"> 
        !!No User Blocked
      </div>

      }
      {User?.Blocks?.map((itm, idx) => {
        return <BlockedUserCards key={idx} data={itm} />;
      })}
    </Layout>
  );
};

export default BlockedUser;
