import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import PostCard from "../Component/PostCard";
const Search = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSideBarData({
        ...sideBarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPost(data.posts);
        setLoading(false);
        if (data.posts.length >9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange=(e)=>{
if(e.target.id==="searchTerm"){
    setSideBarData({...sideBarData,searchTerm:e.target.value})
}
if(e.target.id==="sort"){
    const order=e.target.value||"desc";
    setSideBarData({...sideBarData,sort:order})
}
if(e.target.id==="category"){
    const category=e.target.value||"uncategorized";
    setSideBarData({...sideBarData,category})
}
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(location.search)
    urlParams.set("searchTerm",sideBarData.searchTerm)
    urlParams.set("sort",sideBarData.sort)
    urlParams.set("category",sideBarData.category)
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

  const handleShowMore=async()=>{
    const numberOfPost=post.length;
    const startIndex=numberOfPost;
    const urlParams=new URLSearchParams(location.search)
    urlParams.set("startIndex",startIndex);
    const searchQuery=urlParams.toString();
    const res=await fetch(`/api/getposts?${searchQuery}`)
    if(!res.ok){
        return;
    }
    else{
        const data=await res.json();
        setPost([...post,...data.posts])
        if(data.posts.length>9){
            setShowMore(true)
        }
        else{
            setShowMore(false)
        }
    }
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <TextInput placeholder="Search..." id="searchTerm" type="text" value={sideBarData.searchTerm} onChange={handleChange} />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold" >Sort:</label>
            <select onChange={handleChange} value={sideBarData.sort} id="sort">
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold" >Category:</label>
            <select onChange={handleChange} value={sideBarData.category} id="category">
                <option value="uncategorized">Uncategorized</option>
                <option value="poems">poems</option>
                <option value="stories">stories</option>
                <option value="latest">latest </option>
            </select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">Apply Filters</Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="font-semibold text-3xl sm:border-b border-gray-500 p-3 mt-5">Post Results:</h1>
        <div className="p-7 flex flex-wrap  gap-4">
            {!loading && post.length===0 && <p className="text-xl text-gray-500">No posts found</p>}
            {loading && (
                <p className="text-xl text-gray-500">Loading...</p>
            )}
            {!loading && post && post.map((p)=><PostCard key={p._id} post={p}/>)}
            {showMore && (<button onClick={handleShowMore} className='w-full self-center rounded-xl bg-white text-red-500 hover:bg-blue-500 hover:text-white text-md  py-3 mt-1'>Show More</button>)}
        </div>
      </div>
    </div>
  );
};

export default Search;
