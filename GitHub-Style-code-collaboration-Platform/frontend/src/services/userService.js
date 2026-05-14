import API from "../api/axios";


// GET PROFILE

export const getProfile =
  async ()=>{

    const res =
      await API.get(
        "/users/profile"
      );

    return res.data;

};


// UPDATE PROFILE

export const updateProfile =
  async (formData)=>{

    const res =
      await API.put(
        "/users/profile",
        formData
      );

    return res.data;

};