import API from "../api/axios";


// CREATE BRANCH

export const createBranch =
async (data) => {

  const res =
    await API.post(
      "/branches",
      data
    );

  return res.data;
};


// GET BRANCHES

export const getBranches =
async (repoId) => {

  const res =
    await API.get(
      `/branches/${repoId}`
    );

  return res.data;
};

export const mergeBranches =
async (data) => {

  const res =
    await API.post(
      "/branches/merge",
      data
    );

  return res.data;
};