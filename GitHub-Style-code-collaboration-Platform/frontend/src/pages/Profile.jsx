import {
  useEffect,
  useState
} from "react";

import MainLayout
from "../layouts/MainLayout";

import {
  getProfile,
  updateProfile
} from "../services/userService";

function Profile(){

  const [user,setUser] =
    useState(null);

  const [bio,setBio] =
    useState("");

  const [avatar,setAvatar] =
    useState(null);


  // FETCH PROFILE

  const fetchProfile =
    async ()=>{

      try{

        const data =
          await getProfile();

        setUser(data);

        setBio(data.bio || "");

      }catch(err){

        console.log(err);

      }

    };

  useEffect(()=>{

    fetchProfile();

  },[]);


  // UPDATE PROFILE

  const handleUpdate =
    async (e)=>{

      e.preventDefault();

      try{

        const formData =
          new FormData();

        formData.append(
          "bio",
          bio
        );

        if(avatar){

          formData.append(
            "avatar",
            avatar
          );

        }

        await updateProfile(
          formData
        );

        alert(
          "Profile Updated"
        );

        fetchProfile();

      }catch(err){

        console.log(err);

      }

    };


  if(!user){

    return (
      <MainLayout>
        <h1>Loading...</h1>
      </MainLayout>
    );

  }

  return(

    <MainLayout>

      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-6">
          My Profile
        </h1>

        <div className="flex items-center gap-5 mb-6">

          <img
            src={
              user.avatar ||
              "https://via.placeholder.com/100"
            }
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />

          <div>

            <h2 className="text-2xl text-white font-bold">
              {user.username}
            </h2>

            <p className="text-gray-400">
              {user.email}
            </p>

          </div>

        </div>


        <form
          onSubmit={handleUpdate}
          className="space-y-4"
        >

          <textarea
            value={bio}
            onChange={(e)=>
              setBio(
                e.target.value
              )
            }
            placeholder="Enter bio"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />

          <input
            type="file"
            onChange={(e)=>
              setAvatar(
                e.target.files[0]
              )
            }
            className="text-white"
          />

          <button
            className="bg-blue-500 px-5 py-2 rounded"
          >
            Update Profile
          </button>

        </form>

      </div>

    </MainLayout>

  );

}

export default Profile;