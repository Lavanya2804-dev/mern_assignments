import API from "../api/axios";

// CREATE PR

export const createPR = async (
  prData
) => {
  const res = await API.post(
    "/pull-requests",
    prData
  );

  return res.data;
};

// GET PRS

export const getPRs = async (
  repoId
) => {
  const res = await API.get(
    `/pull-requests/repo/${repoId}`
  );

  return res.data;
};

// MERGE PR

export const mergePR = async (
  id
) => {
  const res = await API.patch(
    `/pull-requests/${id}/merge`
  );

  return res.data;
};

// CLOSE PR

export const closePR = async (
  id
) => {
  const res = await API.patch(
    `/pull-requests/${id}/close`
  );

  return res.data;
};

// REOPEN PR

export const reopenPR = async (
  id
) => {
  const res = await API.patch(
    `/pull-requests/${id}/reopen`
  );

  return res.data;
};

// DELETE PR

export const deletePR = async (
  id
) => {
  const res = await API.delete(
    `/pull-requests/${id}`
  );

  return res.data;
};