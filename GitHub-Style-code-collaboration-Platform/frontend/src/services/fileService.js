import API from "../api/axios";

export const uploadFile = async (formData) => {
  const res = await API.post(
    "/files/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const deleteFile = async (id) => {
  const res = await API.delete(
    `/files/${id}`
  );

  return res.data;
};

export const getSingleFile = async (id) => {
  const res = await API.get(
    `/files/${id}`
  );

  return res.data;
};

export const getRepositoryFiles =
  async (repoId) => {

    const res =
      await API.get(
        `/files/repo/${repoId}`
      );

    return res.data;
};