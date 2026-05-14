import API from "../api/axios";

// Create commit
export const createCommit = async (data) => {
  const res = await API.post(
    "/commits",
    data
  );

  return res.data;
};

// Get repo commits
export const getCommits = async (repoId) => {
  const res = await API.get(
    `/commits/repo/${repoId}`
  );

  return res.data;
};

export const getCommitById =
  async (id) => {

    const res =
      await API.get(
        `/commits/${id}`
      );

    return res.data;
};