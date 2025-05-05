import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingComponent from "../Components/LoadingComponent";

const Layout = ({ children, bg='' }) => {
  const { IsAuthorized } = useUser();

  const navigate = useNavigate();

  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (!IsAuthorized) {
      navigate("/login");
    }
  }, [IsAuthorized]);

  if (Loading) return <LoadingComponent/>

  return (
    <div className={`${bg} min-h-[100dvh] max-w-[120rem] mx-auto`}>
      <Navbar />
      <div className="lg:pt-[4rem] pt-[6rem] px-3 md:px-8 "> {children}</div>
    </div>
  );
};

export default Layout;
