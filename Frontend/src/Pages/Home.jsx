import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import PostCard from '../Component/PostCard'
const Home = () => {
  const[posts,setPosts]=useState([])
  useEffect(()=>{
const fetchPosts=async()=>{
  const res=await fetch('/api/getposts')
  const data=await res.json()
  setPosts(data.posts)
}
fetchPosts();
  },[])
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to My Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.I am an Engineer and the fields in which i am interested beyond codings are poetry, story telling , politics , latest technologies.So you will get articles related from these fields too.
         You can use this site in dark mode too, so relax your eyes and enjoy the post ...Don't forget to drop your valuable feedbacks.
        </p>
        <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex fle-col gap-8 py-7">  {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4 justify-between'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}</div>
    </div>
  )
}

export default Home
