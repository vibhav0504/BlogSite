import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner , Button } from "flowbite-react";
import CommentSection from "../Component/CommentSection";
import PostCard from "../Component/PostCard";
const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const[recentPost,setRecentPost]=useState(null)
  // console.log(post);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(()=>{
try {
  const fetchPost=async()=>{
    const res=await fetch(`/api/getposts?limit=3`);
    const data=await res.json();

    if(res.ok){
      setRecentPost(data.posts)
    }
  }
  fetchPost()
} catch (error) {
  console.log(error.message)
}
  },[])
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 max-w-6xl flex flex-col min-h-screen mx-auto">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-screen-2xl mx-a  lg:text-4xl">
        {post?.title}
      </h1>
      <Link to={`/search?category=${post?.category}`}><Button color="gray" pill size='xs' className="mx-auto mt-4">{post?.category}</Button></Link>
      <img src={post?.image} alt= {post?.title} className="max-h-[600px] w-full object-cover mt-10 p-3"/>
      <div className="flex justify-between p-4 border-b border-gray-500 mx-auto w-full text-sm">
        <span >{new Date(post?.createdAt).toLocaleDateString()}</span>
        <span className="italic">{(post?.content.length/1000).toFixed(0)}mins</span>
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{ __html: post?.content }}></div>
      <CommentSection postId={post?._id}/>
      {}
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent Articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center ">
          {recentPost && recentPost.map((post)=>(
           <PostCard key={post._id} post={post}/>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PostPage;