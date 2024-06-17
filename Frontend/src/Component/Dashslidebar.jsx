import { Sidebar } from "flowbite-react";
import React from "react";
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { useState , useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/User/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Dashslidebar = () => {
  const location = useLocation();
  const dispatch=useDispatch();
  const [tab, setTab] = useState();
  const {currentUser}=useSelector(state=>state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabfromurl = urlParams.get("tab");
    if (tabfromurl) {
      setTab(tabfromurl);
    }
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-4">
        {currentUser.isAdmin && <Link to="/dashboard?tab=dash">
          <Sidebar.Item active={tab==="dash"} icon={HiChartPie} as="div">
            DashBoard
          </Sidebar.Item>
          </Link>}
        <Link to="/dashboard?tab=profile">
          <Sidebar.Item active={tab==="profile" ||!tab}  icon={HiUser} label={currentUser.isAdmin?"Admin":"User"} labelColor="dark" as="div">
            Profile
          </Sidebar.Item>
          </Link>
        {currentUser.isAdmin && <Link to="/dashboard?tab=post">
          <Sidebar.Item active={tab==="post"} icon={HiDocumentText} as="div">
            Post
          </Sidebar.Item>
          </Link>}
        {currentUser.isAdmin && <Link to="/dashboard?tab=users">
          <Sidebar.Item active={tab==="users"} icon={HiOutlineUserGroup} as="div">
            Users
          </Sidebar.Item>
          </Link>}
        {currentUser.isAdmin && <Link to="/dashboard?tab=comment">
          <Sidebar.Item active={tab==="comment"} icon={HiAnnotation} as="div">
            Comments
          </Sidebar.Item>
          </Link>}
       
          <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
            Sign-Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default Dashslidebar;
