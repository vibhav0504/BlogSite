import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dashslidebar from "../Component/Dashslidebar";
import Dashprofile from "../Component/Dashprofile";
import DashPost from "../Component/DashPost";
import DashUsers from "../Component/DashUsers";
import DashComment from "../Component/DashComment";
import DashBoardComponent from "../Component/DashBoardComponent";
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabfromurl = urlParams.get("tab");
    if (tabfromurl) {
      setTab(tabfromurl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div  className=" md:w-56">
        {/* SlideBar */}
        <Dashslidebar />
      </div>
      {/* Profile */}
      {tab === "profile" && <Dashprofile />}
      {tab==="post" && <DashPost/>}
      {tab==="users" && <DashUsers/>}
      {tab==="comment" && <DashComment/>}
      {tab==="dash" && <DashBoardComponent/>}
    </div>
  );
};

export default Dashboard;
