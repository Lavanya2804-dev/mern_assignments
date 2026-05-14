import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  createIssue,
  getIssues,
  closeIssue,
  reopenIssue,
  deleteIssue,
} from "../services/issueService";

import {
  addComment,
  getComments,
  deleteComment,
} from "../services/commentService";

function Issues() {

  const { id } = useParams();

  const [issues, setIssues] =
    useState([]);

  const [comments, setComments] =
    useState({});

  const [commentText, setCommentText] =
    useState({});

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  // FETCH COMMENTS

  const fetchComments = async (
    issueId
  ) => {

    try {

      const data =
        await getComments(issueId);

      setComments((prev) => ({
        ...prev,
        [issueId]: data,
      }));

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH ISSUES

  const fetchIssues = async () => {

    try {

      if (!id) return;

      const issues =
        await getIssues(id);

      setIssues(issues);

      issues.forEach((issue) => {

        fetchComments(
          issue._id
        );

      });

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchIssues();

  }, []);

  // HANDLE CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // CREATE ISSUE

  const handleCreateIssue =
    async (e) => {

      e.preventDefault();

      try {

        await createIssue({
          repository: id,
          title:
            formData.title,
          description:
            formData.description,
        });

        alert(
          "Issue Created"
        );

        setFormData({
          title: "",
          description: "",
        });

        fetchIssues();

      } catch (error) {

        console.log(error);

        alert(
          "Create Failed"
        );

      }
    };

  // CLOSE ISSUE

  const handleCloseIssue =
    async (issueId) => {

      try {

        await closeIssue(
          issueId
        );

        fetchIssues();

      } catch (error) {

        console.log(error);

      }
    };

  // REOPEN ISSUE

  const handleReopenIssue =
    async (issueId) => {

      try {

        await reopenIssue(
          issueId
        );

        fetchIssues();

      } catch (error) {

        console.log(error);

      }
    };

  // DELETE ISSUE

  const handleDeleteIssue =
    async (issueId) => {

      try {

        await deleteIssue(
          issueId
        );

        fetchIssues();

      } catch (error) {

        console.log(error);

      }
    };

  // ADD COMMENT

  const handleAddComment =
    async (issueId) => {

      try {

        await addComment({
          issue: issueId,
          text:
            commentText[
              issueId
            ],
        });

        setCommentText(
          (prev) => ({
            ...prev,
            [issueId]: "",
          })
        );

        fetchComments(
          issueId
        );

      } catch (error) {

        console.log(error);

      }
    };

  // DELETE COMMENT

  const handleDeleteComment =
    async (
      commentId,
      issueId
    ) => {

      try {

        await deleteComment(
          commentId
        );

        fetchComments(
          issueId
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <MainLayout>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">

        <h1 className="text-3xl font-bold mb-6 text-white">
          Repository Issues
        </h1>

        {/* CREATE ISSUE */}

        <form
          onSubmit={
            handleCreateIssue
          }
          className="space-y-4 mb-8"
        >

          <input
            type="text"
            name="title"
            placeholder="Issue Title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            className="w-full p-3 rounded bg-gray-700 text-white"
          />

          <textarea
            name="description"
            placeholder="Issue Description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            className="w-full p-3 rounded bg-gray-700 text-white"
          />

          <button className="bg-blue-500 px-5 py-2 rounded hover:bg-blue-600">
            Create Issue
          </button>

        </form>

        {/* ISSUE LIST */}

        <div className="space-y-4">

          {issues.length === 0 ? (

            <p className="text-gray-400">
              No issues found
            </p>

          ) : (

            issues.map((issue) => (

              <div
                key={issue._id}
                className="bg-gray-700 p-5 rounded-lg"
              >

                <div className="flex justify-between items-start">

                  <div className="w-full">

                    <h2 className="text-xl font-bold text-white">
                      {issue.title}
                    </h2>

                    <p className="text-gray-300 mt-2">
                      {
                        issue.description
                      }
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      Author:
                      {" "}
                      {
                        issue.author
                          ?.username
                      }
                    </p>

                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded text-sm ${
                        issue.status ===
                        "open"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {issue.status}
                    </span>

                    {/* COMMENTS */}

                    <div className="mt-6">

                      <h3 className="text-lg font-bold text-white mb-3">
                        Comments
                      </h3>

                      {/* COMMENT INPUT */}

                      <div className="flex gap-2 mb-4">

                        <input
                          type="text"
                          placeholder="Add comment"
                          value={
                            commentText[
                              issue._id
                            ] || ""
                          }
                          onChange={(e) =>
                            setCommentText(
                              (
                                prev
                              ) => ({
                                ...prev,
                                [issue._id]:
                                  e
                                    .target
                                    .value,
                              })
                            )
                          }
                          className="flex-1 p-2 rounded bg-gray-800 text-white"
                        />

                        <button
                          onClick={() =>
                            handleAddComment(
                              issue._id
                            )
                          }
                          className="bg-blue-500 px-4 py-2 rounded"
                        >
                          Add
                        </button>

                      </div>

                      {/* COMMENTS LIST */}

                      <div className="space-y-2">

                        {comments[
                          issue._id
                        ]?.map(
                          (
                            comment
                          ) => (

                            <div
                              key={
                                comment._id
                              }
                              className="bg-gray-800 p-3 rounded flex justify-between items-center"
                            >

                              <div>

                                <p className="text-white">
                                  {
                                    comment.text
                                  }
                                </p>

                                <p className="text-gray-400 text-sm">
                                  {
                                    comment
                                      .user
                                      ?.username
                                  }
                                </p>

                              </div>

                              <button
                                onClick={() =>
                                  handleDeleteComment(
                                    comment._id,
                                    issue._id
                                  )
                                }
                                className="bg-red-500 px-3 py-1 rounded"
                              >
                                Delete
                              </button>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="flex gap-3 ml-4">

                    {issue.status ===
                    "open" ? (

                      <button
                        onClick={() =>
                          handleCloseIssue(
                            issue._id
                          )
                        }
                        className="bg-yellow-500 px-4 py-2 rounded"
                      >
                        Close
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          handleReopenIssue(
                            issue._id
                          )
                        }
                        className="bg-green-500 px-4 py-2 rounded"
                      >
                        Reopen
                      </button>

                    )}

                    <button
                      onClick={() =>
                        handleDeleteIssue(
                          issue._id
                        )
                      }
                      className="bg-red-500 px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default Issues;