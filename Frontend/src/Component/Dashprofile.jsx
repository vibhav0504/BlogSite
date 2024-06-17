import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, TextInput, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/User/userSlice";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom"
const Dashprofile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUpLoadProgress, setImageFileUpLoadProgress] = useState(null);
  const [imageFileUpLoadError, setImageFileUpLoadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { currentUser , error ,loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const filePicker = useRef();
  const uploadImage = async () => {
    setImageFileUpLoadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUpLoadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUpLoadError(
          "Could not upload image (File must be less than 2 MB)"
        );
        setImageFileUpLoadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No any change found");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserError(null);
        setUpdateUserSuccess("User updated Successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      // console.log(currentUser._id)
      dispatch(deleteUserStart());
      const res = await fetch(`/api/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      // console.log(res);
      const data = await res.json();
      if (!res.ok) {
        // console.log(1);
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
     
      dispatch(deleteUserFailure(error.message));
    }
  };
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
    <div className="w-full max-w-lg mx-auto p-3">
      <h1 className="my-7 font-semibold text-3xl text-center"> Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePicker}
          hidden
        />
        <div
          className=" relative w-32 h-32 self-center  cursor-pointer shadow-md overflow-hidden rounded-full "
          onClick={() => filePicker.current.click()}
        >
          {imageFileUpLoadProgress && (
            <CircularProgressbar
              value={imageFileUpLoadProgress || 0}
              text={`${imageFileUpLoadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUpLoadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] ${
              imageFileUpLoadProgress &&
              imageFileUpLoadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUpLoadError && (
          <Alert color="failure">{imageFileUpLoadError}</Alert>
        )}

        <TextInput
          type="text"
          placeholder="username"
          defaultValue={currentUser.userName}
          id="userName"
          onChange={handleChange}
        />
        <TextInput
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
        />
        <TextInput
          type="password"
          placeholder="password"
          defaultValue="********"
          id="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading}>
         {loading?'Loading...':' Update'}
        </Button>
{currentUser.isAdmin && (
 <Link to={"/create-post"}>
 <Button type="button" gradientDuoTone='purpleToPink' className="w-full">Create a post</Button>
 </Link>
)}

      </form>
      <div className="text-white flex justify-between mt-5">
        <span
          onClick={() => setShowModal(true)}
          className="cursor-pointer bg-blue-300 p-3 rounded-full"
        >
          Delete Account
        </span>
        <span
          className=" text-white cursor-pointer bg-blue-300 p-3 rounded-full"
          onClick={handleSignOut}
        >
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert className="mt-5" color="success">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert className="mt-5" color="failure">
          {updateUserError}
        </Alert>
      )}
      {
    error && <Alert className="mt-5" color='failure'>{error}</Alert>
  }
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
              Are you sure you want to delete this account?
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
  );
};

export default Dashprofile;
