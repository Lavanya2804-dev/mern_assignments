import API from "../api/axios";


export const getReadme =
  async (repoId) => {

    const res =
      await API.get(
        `/readme/${repoId}`
      );

    return res.data;
};


export const updateReadme =
  async (
    repoId,
    readme
  ) => {

    const res =
      await API.put(
        `/readme/${repoId}`,
        { readme }
      );

    return res.data;
};