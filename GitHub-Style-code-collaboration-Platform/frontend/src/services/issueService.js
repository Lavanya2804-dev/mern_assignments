import API from "../api/axios";

// CREATE ISSUE

export const createIssue = async (
  issueData
) => {
  const res = await API.post(
    "/issues",
    issueData
  );

  return res.data;
};

// GET ISSUES

export const getIssues = async (
  repoId
) => {
  const res = await API.get(
    `/issues/repo/${repoId}`
  );

  return res.data;
};

// CLOSE ISSUE

export const closeIssue = async (
  id
) => {
  const res = await API.patch(
    `/issues/${id}/close`
  );

  return res.data;
};

// REOPEN ISSUE

export const reopenIssue = async (
  id
) => {
  const res = await API.patch(
    `/issues/${id}/reopen`
  );

  return res.data;
};

// DELETE ISSUE

export const deleteIssue = async (
  id
) => {
  const res = await API.delete(
    `/issues/${id}`
  );

  return res.data;
};