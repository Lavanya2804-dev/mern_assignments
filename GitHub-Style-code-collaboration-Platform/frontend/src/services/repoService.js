import API from "../api/axios";

export const getRepositories = async () => {
  const res = await API.get("/repos");

  return res.data;
};

export const createRepository = async (repoData) => {
  const res = await API.post("/repos", repoData);

  return res.data;
};

export const getRepositoryById = async (id) => {
  const res = await API.get(`/repos/${id}`);

  return res.data;
};

export const deleteRepository = async (id) => {
  const res = await API.delete(`/repos/${id}`);

  return res.data;
};

export const updateRepository = async (id, repoData) => {
  const res = await API.patch(`/repos/${id}`, repoData);

  return res.data;
};

export const getCollaborators = async (id) => {
  const res = await API.get(`/repos/${id}/collaborators`);

  return res.data;
};

// ADD COLLABORATOR

export const addCollaborator = async (
  repoId,
  collaboratorData
) => {

  const res = await API.post(
    `/repos/${repoId}/collaborators`,
    collaboratorData
  );

  return res.data;
};


// UPDATE ROLE

export const updateCollaboratorRole =
  async (
    repoId,
    userId,
    roleData
  ) => {

    const res = await API.patch(
      `/repos/${repoId}/collaborators/${userId}`,
      roleData
    );

    return res.data;
  };


// REMOVE COLLABORATOR

export const removeCollaborator =
  async (
    repoId,
    userId
  ) => {

    const res = await API.delete(
      `/repos/${repoId}/collaborators/${userId}`
    );

    return res.data;
  };