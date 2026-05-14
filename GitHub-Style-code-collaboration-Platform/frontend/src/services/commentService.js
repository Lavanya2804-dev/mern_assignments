import API from "../api/axios";

// ADD COMMENT

export const addComment = async (
  commentData
) => {
  const res = await API.post(
    "/comments",
    commentData
  );

  return res.data;
};

// GET COMMENTS

export const getComments = async (
  issueId
) => {
  const res = await API.get(
    `/comments/issue/${issueId}`
  );

  return res.data;
};

// DELETE COMMENT

export const deleteComment = async (
  id
) => {
  const res = await API.delete(
    `/comments/${id}`
  );

  return res.data;
};