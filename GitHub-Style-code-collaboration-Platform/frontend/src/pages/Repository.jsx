// Repository.jsx

import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  getRepositoryById,
  deleteRepository,
  getCollaborators,
  addCollaborator,
  removeCollaborator,
  updateCollaboratorRole,
} from "../services/repoService";

import {
  uploadFile,
  getRepositoryFiles
} from "../services/fileService";

import {
  createCommit,
  getCommits
} from "../services/commitService";

import ReactMarkdown
from "react-markdown";

import {
  getReadme,
  updateReadme
}
from "../services/readmeService";

import {
  createBranch,
  getBranches,
  mergeBranches
}
from "../services/branchService";

function Repository() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [repo, setRepo] =
    useState(null);

  const [collaborators,
    setCollaborators] =
    useState([]);

  const [selectedFile,
    setSelectedFile] =
    useState(null);

  const [uploadedFiles,
    setUploadedFiles] =
    useState([]);

  const [commits,
    setCommits] =
    useState([]);

  const [commitMessage,
    setCommitMessage] =
    useState("");

  const [collaboratorData,
    setCollaboratorData] =
    useState({
      userId: "",
      role: "collaborator",
    });

    const [branches,
  setBranches] =
  useState([]);

const [branchName,
  setBranchName] =
  useState("");

  // FETCH REPOSITORY

  const fetchRepo = async () => {

    try {

      const data =
        await getRepositoryById(id);

      setRepo(data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH COLLABORATORS

  const fetchCollaborators =
    async () => {

      try {

        const data =
          await getCollaborators(id);

        setCollaborators(data);

      } catch (error) {

        console.log(error);

      }
    };

  // FETCH FILES

  const fetchFiles = async () => {

    try {

      const data =
        await getRepositoryFiles(id);

      setUploadedFiles(data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH COMMITS

  const fetchCommits = async () => {

    try {

      const data =
        await getCommits(id);

      setCommits(data);

    } catch (error) {

      console.log(error);

    }
  };

  const [readme,
  setReadme] =
  useState("");

const [editingReadme,
  setEditingReadme] =
  useState(false);

  const fetchReadme =
  async () => {

    try {

      const data =
        await getReadme(id);

      setReadme(
        data.readme
      );

    } catch (error) {

      console.log(error);

    }
};

const fetchBranches =
async () => {

  try {

    const data =
      await getBranches(id);

    setBranches(data);

  } catch (error) {

    console.log(error);

  }
};

  useEffect(() => {

    fetchRepo();
    fetchCollaborators();
    fetchFiles();
    fetchCommits();
    fetchReadme();
    fetchBranches();

  }, []);

  // DELETE REPOSITORY

  const handleDeleteRepo =
    async () => {

      try {

        await deleteRepository(id);

        alert(
          "Repository Deleted"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          "Delete Failed"
        );

      }
    };

  // ADD COLLABORATOR

  const handleAddCollaborator =
    async (e) => {

      e.preventDefault();

      try {

        await addCollaborator(
          id,
          collaboratorData
        );

        alert(
          "Collaborator Added"
        );

        setCollaboratorData({
          userId: "",
          role:
            "collaborator",
        });

        fetchCollaborators();

      } catch (error) {

        console.log(error);

        alert(
          "Add Collaborator Failed"
        );

      }
    };

  // REMOVE COLLABORATOR

  const handleRemoveCollaborator =
    async (userId) => {

      try {

        await removeCollaborator(
          id,
          userId
        );

        alert(
          "Collaborator Removed"
        );

        fetchCollaborators();

      } catch (error) {

        console.log(error);

      }
    };

  // UPDATE ROLE

  const handleRoleUpdate =
    async (
      userId,
      role
    ) => {

      try {

        await updateCollaboratorRole(
          id,
          userId,
          { role }
        );

        alert(
          "Role Updated"
        );

        fetchCollaborators();

      } catch (error) {

        console.log(error);

      }
    };

  // FILE UPLOAD

  const handleUpload =
    async (e) => {

      e.preventDefault();

      if (!selectedFile) {

        return alert(
          "Select File"
        );

      }

      try {

        const formData =
          new FormData();

        formData.append(
          "file",
          selectedFile
        );

        formData.append(
          "repository",
          id
        );

        const uploaded =
          await uploadFile(
            formData
          );

        setUploadedFiles(
          (prev) => [
            ...prev,
            uploaded,
          ]
        );

        alert(
          "File Uploaded"
        );

        setSelectedFile(null);

      } catch (error) {

        console.log(error);

        alert(
          "Upload Failed"
        );

      }
    };

  // CREATE COMMIT

  const handleCreateCommit =
    async () => {

      try {

        if (
          uploadedFiles.length === 0
        ) {
          return alert(
            "Upload files first"
          );
        }

        if (!commitMessage) {
          return alert(
            "Enter commit message"
          );
        }

        const data = {
          repository: id,
          message: commitMessage,
          files: uploadedFiles.map(
            (file) => file._id
          )
        };

        await createCommit(data);

        alert(
          "Commit Created"
        );

        setCommitMessage("");

        fetchCommits();

      } catch (error) {

        console.log(error);

        alert(
          "Commit Failed"
        );

      }
    };

    const handleSaveReadme =
  async () => {

    try {

      await updateReadme(
        id,
        readme
      );

      alert(
        "README Updated"
      );

      setEditingReadme(false);

    } catch (error) {

      console.log(error);

    }
};

const handleCreateBranch =
async (e) => {

  e.preventDefault();

  if (!branchName) {

    return alert(
      "Enter branch name"
    );

  }

  try {

    await createBranch({

      repository: id,

      name: branchName

    });

    alert(
      "Branch created"
    );

    setBranchName("");

    fetchBranches();

  } catch (error) {

    console.log(error);

    alert(
      "Branch creation failed"
    );

  }
};

const handleMergeBranch =
async (sourceBranchId) => {

  try {

    const mainBranch =
      branches.find(
        (b) => b.isDefault === true
      );

    if (!mainBranch) {

      return alert(
        "Main branch not found"
      );

    }

    await mergeBranches({

      sourceBranchId,

      targetBranchId:
        mainBranch._id

    });

    alert(
      "Branch merged successfully"
    );

    fetchCommits();

  } catch (error) {

    console.log(error);

    alert(
      "Merge failed"
    );

  }
};

  if (!repo) {

    return (
      <MainLayout>
        <h1>
          Loading...
        </h1>
      </MainLayout>
    );
  }

  return (

    <MainLayout>

      {/* REPOSITORY DETAILS */}

      <div className="bg-gray-800 p-6 rounded-lg mb-6">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-blue-400">
              {repo.name}
            </h1>

            <p className="text-gray-300 mt-3">
              {repo.description}
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate(
                  `/repo/${id}/issues`
                )
              }
              className="bg-purple-500 px-5 py-2 rounded hover:bg-purple-600"
            >
              Open Issues
            </button>

            <button
              onClick={() =>
                navigate(
                  `/repo/${id}/pull-requests`
                )
              }
              className="bg-blue-500 px-5 py-2 rounded hover:bg-blue-600"
            >
              Pull Requests
            </button>

            <button
              onClick={
                handleDeleteRepo
              }
              className="bg-red-500 px-5 py-2 rounded hover:bg-red-600"
            >
              Delete Repo
            </button>

          </div>

        </div>

      </div>

      {/* COLLABORATORS */}

      <div className="bg-gray-800 p-6 rounded-lg mb-6">

        <h2 className="text-2xl font-bold mb-4 text-white">
          Collaborators
        </h2>

        <form
          onSubmit={
            handleAddCollaborator
          }
          className="flex gap-3 mb-6"
        >

          <input
            type="text"
            placeholder="User ID"
            value={
              collaboratorData.userId
            }
            onChange={(e) =>
              setCollaboratorData({
                ...collaboratorData,
                userId:
                  e.target.value,
              })
            }
            className="flex-1 p-3 rounded bg-gray-700 text-white"
          />

          <select
            value={
              collaboratorData.role
            }
            onChange={(e) =>
              setCollaboratorData({
                ...collaboratorData,
                role:
                  e.target.value,
              })
            }
            className="p-3 rounded bg-gray-700 text-white"
          >

            <option value="collaborator">
              Collaborator
            </option>

            <option value="viewer">
              Viewer
            </option>

          </select>

          <button className="bg-green-500 px-5 py-2 rounded">
            Add
          </button>

        </form>

        <div className="space-y-3">

          {collaborators.map(
            (collab) => (

              <div
                key={
                  collab.user._id
                }
                className="bg-gray-700 p-4 rounded flex justify-between items-center"
              >

                <div>

                  <p className="text-white font-bold">
                    {
                      collab.user
                        ?.username
                    }
                  </p>

                  <p className="text-sm text-gray-400">
                    {
                      collab.user
                        ?.email
                    }
                  </p>

                </div>

                <div className="flex gap-3 items-center">

                  <select
                    value={
                      collab.role
                    }
                    onChange={(e) =>
                      handleRoleUpdate(
                        collab.user._id,
                        e.target.value
                      )
                    }
                    className="bg-gray-600 text-white p-2 rounded"
                  >

                    <option value="collaborator">
                      Collaborator
                    </option>

                    <option value="viewer">
                      Viewer
                    </option>

                  </select>

                  <button
                    onClick={() =>
                      handleRemoveCollaborator(
                        collab.user._id
                      )
                    }
                    className="bg-red-500 px-4 py-2 rounded"
                  >
                    Remove
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* BRANCH SECTION */}

<div className="bg-gray-800 p-6 rounded-lg mb-6">

  <h2 className="text-2xl font-bold mb-4 text-white">
    Branches
  </h2>

  {/* CREATE BRANCH */}

  <form
    onSubmit={
      handleCreateBranch
    }
    className="flex gap-3 mb-6"
  >

    <input
      type="text"
      placeholder="Branch name"
      value={branchName}
      onChange={(e) =>
        setBranchName(
          e.target.value
        )
      }
      className="flex-1 p-3 rounded bg-gray-700 text-white"
    />

    <button
      className="bg-blue-500 px-5 py-2 rounded hover:bg-blue-600"
    >
      Create Branch
    </button>

  </form>

  {/* BRANCH LIST */}

  <div className="space-y-3">

  {branches.length === 0 ? (

    <p className="text-gray-400">
      No branches found
    </p>

  ) : (

    branches.map((branch) => (

      <div
        key={branch._id}
        className="bg-gray-700 p-4 rounded flex justify-between items-center"
      >

        <div>

          <h3 className="font-bold text-white">
            {branch.name}
          </h3>

          {branch.isDefault && (

            <p className="text-green-400 text-sm">
              Default Branch
            </p>

          )}

        </div>

        {!branch.isDefault && (

          <button
            onClick={() =>
              handleMergeBranch(branch._id)
            }
            className="bg-green-500 px-4 py-2 rounded"
          >
            Merge to Main
          </button>

        )}

      </div>

    ))

  )}

</div>

</div>

      {/* FILE SECTION */}

      <div className="bg-gray-800 p-6 rounded-lg mb-6">

        <h2 className="text-2xl font-bold mb-4 text-white">
          Files
        </h2>

        <form
          onSubmit={
            handleUpload
          }
          className="mb-6"
        >

          <input
            type="file"
            onChange={(e) =>
              setSelectedFile(
                e.target.files[0]
              )
            }
            className="mb-4 text-white"
          />

          <br />

          <button className="bg-blue-500 px-5 py-2 rounded hover:bg-blue-600">
            Upload File
          </button>

        </form>

        <div className="space-y-3">

          {uploadedFiles.length === 0 ? (

            <p className="text-gray-400">
              No files uploaded yet
            </p>

          ) : (

            uploadedFiles.map(
              (file) => (

                <div
                  key={file._id}
                  className="bg-gray-700 p-4 rounded flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-bold text-white">
                      {file.name}
                    </h3>

                    <a
                      href={
                        file.fileUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 text-sm"
                    >
                      View File
                    </a>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>

      {/* README SECTION */}

<div className="bg-gray-800 p-6 rounded-lg mt-6">

  <div className="flex justify-between items-center mb-4">

    <h2 className="text-2xl font-bold text-white">
      README
    </h2>

    <button
      onClick={() =>
        setEditingReadme(
          !editingReadme
        )
      }
      className="bg-blue-500 px-4 py-2 rounded"
    >
      {
        editingReadme
        ? "Cancel"
        : "Edit"
      }
    </button>

  </div>

  {editingReadme ? (

    <div>

      <textarea
        value={readme}
        onChange={(e) =>
          setReadme(
            e.target.value
          )
        }
        className="w-full h-64 bg-gray-700 text-white p-4 rounded"
      />

      <button
        onClick={
          handleSaveReadme
        }
        className="bg-green-500 px-5 py-2 rounded mt-4"
      >
        Save README
      </button>

    </div>

  ) : (

    <div className="prose prose-invert max-w-none">

      <ReactMarkdown>
        {readme}
      </ReactMarkdown>

    </div>

  )}

</div>

      {/* COMMIT SECTION */}

      <div className="bg-gray-800 p-6 rounded-lg">

        <h2 className="text-2xl font-bold mb-4 text-white">
          Commits
        </h2>

        {/* CREATE COMMIT */}

        <div className="mb-6">

          <input
            type="text"
            placeholder="Commit message"
            value={commitMessage}
            onChange={(e) =>
              setCommitMessage(
                e.target.value
              )
            }
            className="w-full p-3 rounded bg-gray-700 text-white mb-3"
          />

          <button
            onClick={
              handleCreateCommit
            }
            className="bg-green-500 px-5 py-2 rounded hover:bg-green-600"
          >
            Create Commit
          </button>

        </div>

        {/* COMMIT LIST */}

        <div className="space-y-3">

          {commits.length === 0 ? (

            <p className="text-gray-400">
              No commits yet
            </p>

          ) : (

            commits.map(
              (commit) => (

                <div
                  key={commit._id}
                  className="bg-gray-700 p-4 rounded"
                >

                 <h3
  onClick={() =>
    navigate(`/commit/${commit._id}`)
  }
  className="text-white font-bold cursor-pointer hover:text-blue-400"
>
  {commit.message}
</h3>

                  <p className="text-sm text-gray-400 mt-1">
                    By:
                    {" "}
                    {
                      commit.author
                        ?.username
                    }
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {
                      new Date(
                        commit.createdAt
                      ).toLocaleString()
                    }
                  </p>

                </div>

              )
            )

          )}

        </div>

      </div>

    </MainLayout>

  );
}

export default Repository;