import React, { useEffect ,useState } from 'react'
import {useSelector} from "react-redux"
import {Button, Table , Modal} from "flowbite-react" 
import {FaCheck , FaTimes} from "react-icons/fa"
import { HiOutlineExclamationCircle } from "react-icons/hi";
const DashUsers = () => {
   const[users,setUsers]=useState([])
   const[showMore,setShowMore]=useState(true);
   const[showModal,setShowModal]=useState(false);
   const[userIdToDelete,setUserIdToDelete]=useState(null);
  const {currentUser}=useSelector(state=>state.user)
 
  useEffect(()=>{
const fetchUsers=async()=>{
try {
    const res=await fetch (`api/getusers`)
    const data=await res.json();
   if(res.ok){
    setUsers(data.users)
    if(data.users?.length<9){
      setShowMore(false);
    }
   }
} catch (error) {
  console.log(error.message)
}
}
if(currentUser.isAdmin){
  fetchUsers();
}
  },[currentUser._id])
 
const handleShowMore=async()=>{
  const startIndex=users.length;
try {
  const res=await fetch(`/api/getusers?startIndex=${startIndex}`);
  const data=await res.json();
  if(res.ok){
    setUsers((prev)=>[...prev,...data.users])
    if(data.users.length<9){
      setShowMore(false);
      
    }
  }
} catch (error) {
  console.log(error.message)
}
}

const handleDeleteUser=async()=>{
   try {
    const res = await fetch(`/api/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data=await res.json();
      if(res.ok){
        setUsers((prev)=>prev.filter((user)=>user._id!==userIdToDelete));
        setShowModal(false)
      }
      else{
        console.log(data.message)
      }
   } catch (error) {
    console.log(error.message)
   }
}
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
   {currentUser?.isAdmin && users?.length>0 ? (
<>
<Table hoverable className='shadow-md'>
<Table.Head>
<Table.HeadCell>Date created </Table.HeadCell>
<Table.HeadCell>User Image</Table.HeadCell>
<Table.HeadCell>Username</Table.HeadCell>
<Table.HeadCell>Email</Table.HeadCell>
<Table.HeadCell>Admin </Table.HeadCell>
<Table.HeadCell> Delete </Table.HeadCell>
</Table.Head>
{ users.map((user)=>{
return (
  <Table.Body className='divide-y' key={user._id}>
  <Table.Row >
    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
    <Table.Cell>
      <img  src={user.profilePicture} alt={user.userName} className='w-10 h-10 object-cover bg-gray-500 rounded-full'/>
   </Table.Cell>
    <Table.Cell className='text-emerald-600 text-md'>
      {user.userName}
    </Table.Cell>
    <Table.Cell>
      {user.email}
   </Table.Cell>
    <Table.Cell>
      {user.isAdmin ?( <FaCheck className='text-green-500'/>):(<FaTimes className='text-red-500'/>)}
   </Table.Cell>
   <Table.Cell onClick={()=>{setShowModal(true);setUserIdToDelete(user._id)}} className='text-red-400 hover:underline cursor-pointer'>
    Delete
   </Table.Cell>
    
  </Table.Row>
</Table.Body>
)
})}
</Table>
{showMore && (<button onClick={handleShowMore} className='w-full self-center rounded-xl bg-white text-red-500 hover:bg-blue-500 hover:text-white text-md  py-3 mt-1'>Show More</button>)}
</>
     ) : (
    <p>You have no users yet !</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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
export default DashUsers;
