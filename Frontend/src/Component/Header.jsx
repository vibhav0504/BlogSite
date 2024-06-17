import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon , FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/User/userSlice";
import { toggletheme } from "../redux/theme/themeSlice";
const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const location=useLocation()
  const navigate=useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  const {theme}=useSelector(state=>state.theme)
  const[searchTerm,setSearchTerm]=useState()
  useEffect(()=>{
const urlParams=new URLSearchParams(location.search);
const searchTermFromUrl = urlParams.get('searchTerm');
if (searchTermFromUrl) {
  setSearchTerm(searchTermFromUrl);
}
  },[location.search])
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
  const handleSubmit=async(e)=>{
e.preventDefault();
const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  return (
    <div>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="rounded-lg text-pink-500 px-1  py-1 bg-gradient-to-r from-indigo-500 to-white">
            My
          </span>
          Blog
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </form>
        <div className="flex gap-4 md:order-2">
          <Button className="w-12 h-10 lg:hidden" color="gray" pill>
            <AiOutlineSearch />
          </Button>
          <Button
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            pill
            onClick={() => dispatch(toggletheme())}
          >
          {theme==="light"? <FaMoon />:<FaSun/>}
           
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="user" img={currentUser.profilePicture} />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser.userName}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item onClick={()=>handleSignOut()}>Sign Out</Dropdown.Item>
              </Link>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign-In
              </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;