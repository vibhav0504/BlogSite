import React, { useEffect ,useState } from 'react'
import {useSelector} from "react-redux"
import {Button, Table , Modal} from "flowbite-react" 
import {Link} from "react-router-dom"
import { HiOutlineExclamationCircle } from "react-icons/hi";
const DashPost = () => {
   const[userPost,setUserPost]=useState([])
   const[showMore,setShowMore]=useState(true);
   const[showModal,setShowModal]=useState(false);
   const[postIdToDelete,setPostIdToDelete]=useState(null);
  const {currentUser}=useSelector(state=>state.user)
 
  useEffect(()=>{
const fetchPosts=async()=>{
try {
    const res=await fetch (`/api/getposts?userId=${currentUser._id}`)
    const data=await res.json();
   if(res.ok){
    setUserPost(data.posts)
    if(data.posts.length<9){
      setShowMore(false);
    }
   }
} catch (error) {
  console.log(error.message)
}
}
if(currentUser.isAdmin){
  fetchPosts();
}
  },[currentUser._id])
 
const handleShowMore=async()=>{
  const startIndex=userPost.length;
try {
  const res=await fetch(`/api/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
  const data=await res.json();
  if(res.ok){
    setUserPost((prev)=>[...prev,...data.posts])
    if(data.posts.length<9){
      setShowMore(false);  
    }
  }
} catch (error) {
  console.log(error.message)
}
}

const handleDeletePost = async()=>{
setShowModal(false);
try {
  const res=await fetch(`/api/deletepost/${postIdToDelete}/${currentUser._id}`,{
    method:"DELETE"
  })
  const data=await res.json();
  if(!res.ok){
console.log(data.message)
  }else{
    setUserPost((prev)=>{
     return prev.filter((post)=>post._id!==postIdToDelete )
    })
  }
} catch (error) {
  console.log(error.message)
}
};
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
   {currentUser?.isAdmin && userPost?.length>0 ? (
<>
<Table hoverable className='shadow-md'>
<Table.Head>
<Table.HeadCell>Date Updated </Table.HeadCell>
<Table.HeadCell>Post Image</Table.HeadCell>
<Table.HeadCell>Post Title </Table.HeadCell>
<Table.HeadCell>Category </Table.HeadCell>
<Table.HeadCell> <span>Delete</span> </Table.HeadCell>
<Table.HeadCell>Edit</Table.HeadCell>
</Table.Head>
{ userPost.map((post)=>{
return (
  <Table.Body className='divide-y'  >
  <Table.Row >
    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
    <Table.Cell><Link to={`/post/${post.slug}`}>
      <img  src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500'/>
    </Link></Table.Cell>
    <Table.Cell className='text-emerald-600 text-md'><Link to={`/post/${post.slug}`}>
      {post.title}
    </Link></Table.Cell>
    <Table.Cell>
      {post.category}
   </Table.Cell>
   <Table.Cell onClick={()=>{setShowModal(true);setPostIdToDelete(post._id)}} className='text-red-400 hover:underline cursor-pointer'>
    Delete
   </Table.Cell>
    <Table.Cell className='text-blue-400'>
    <Link to={`/update-post/${post._id}`}>
    Edit
    </Link>
   </Table.Cell>
    
  </Table.Row>
</Table.Body>
)
})}
</Table>
{showMore && (<button onClick={handleShowMore} className='w-full self-center rounded-xl bg-white text-red-500 hover:bg-blue-500 hover:text-white text-md  py-3 mt-1'>Show More</button>)}
</>
     ) : (
    <p>You have no posts yet !</p>
   )}
   <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default DashPost;
