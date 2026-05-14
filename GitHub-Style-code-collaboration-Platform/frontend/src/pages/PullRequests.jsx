import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  createPR,
  getPRs,
  mergePR,
  closePR,
  reopenPR,
  deletePR,
} from "../services/pullRequestService";

function PullRequests() {
  const { id } = useParams();

  const [prs, setPRs] = useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  // FETCH PRS

  const fetchPRs = async () => {
    try {

      if (!id) return;

      const data =
        await getPRs(id);

      setPRs(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPRs();
  }, [id]);

  // HANDLE CHANGE

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // CREATE PR

  const handleCreatePR = async (
    e
  ) => {
    e.preventDefault();

    try {

      await createPR({
        repository: id,
        title: formData.title,
        description:
          formData.description,
        commits: [],
      });

      alert(
        "Pull Request Created"
      );

      setFormData({
        title: "",
        description: "",
      });

      fetchPRs();

    } catch (error) {
      console.log(error);

      alert("Create Failed");
    }
  };

  // MERGE PR

  const handleMergePR = async (
    prId
  ) => {
    try {

      await mergePR(prId);

      fetchPRs();

    } catch (error) {
      console.log(error);
    }
  };

  // CLOSE PR

  const handleClosePR = async (
    prId
  ) => {
    try {

      await closePR(prId);

      fetchPRs();

    } catch (error) {
      console.log(error);
    }
  };

  // REOPEN PR

  const handleReopenPR =
    async (prId) => {
      try {

        await reopenPR(prId);

        fetchPRs();

      } catch (error) {
        console.log(error);
      }
    };

  // DELETE PR

  const handleDeletePR =
    async (prId) => {
      try {

        await deletePR(prId);

        fetchPRs();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <MainLayout>
      <div className="bg-gray-800 p-6 rounded-lg">

        <h1 className="text-3xl font-bold text-white mb-6">
          Pull Requests
        </h1>

        {/* CREATE PR */}

        <form
          onSubmit={
            handleCreatePR
          }
          className="space-y-4 mb-8"
        >
          <input
            type="text"
            name="title"
            placeholder="PR Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />

          <textarea
            name="description"
            placeholder="PR Description"
            value={
              formData.description
            }
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />

          <button className="bg-blue-500 px-5 py-2 rounded hover:bg-blue-600">
            Create PR
          </button>
        </form>

        {/* PR LIST */}

        <div className="space-y-4">

          {!prs ||
          prs.length === 0 ? (
            <p className="text-gray-400">
              No pull requests found
            </p>
          ) : (
            prs.map((pr) => (
              <div
                key={pr._id}
                className="bg-gray-700 p-5 rounded-lg"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-xl font-bold text-white">
                      {pr.title}
                    </h2>

                    <p className="text-gray-300 mt-2">
                      {
                        pr.description
                      }
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      Author:
                      {" "}
                      {
                        pr.author
                          ?.username
                      }
                    </p>

                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded text-sm ${
                        pr.status ===
                        "open"
                          ? "bg-green-500"
                          : pr.status ===
                            "merged"
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }`}
                    >
                      {pr.status}
                    </span>

                  </div>

                  <div className="flex gap-3">

                    {pr.status ===
                    "open" && (
                      <>
                        <button
                          onClick={() =>
                            handleMergePR(
                              pr._id
                            )
                          }
                          className="bg-blue-500 px-4 py-2 rounded"
                        >
                          Merge
                        </button>

                        <button
                          onClick={() =>
                            handleClosePR(
                              pr._id
                            )
                          }
                          className="bg-yellow-500 px-4 py-2 rounded"
                        >
                          Close
                        </button>
                      </>
                    )}

                    {pr.status ===
                      "closed" && (
                      <button
                        onClick={() =>
                          handleReopenPR(
                            pr._id
                          )
                        }
                        className="bg-green-500 px-4 py-2 rounded"
                      >
                        Reopen
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDeletePR(
                          pr._id
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

export default PullRequests;