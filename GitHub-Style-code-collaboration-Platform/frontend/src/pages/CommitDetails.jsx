import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { getCommitById }
from "../services/commitService";

function CommitDetails() {

  const { id } = useParams();

  const [commit, setCommit] =
    useState(null);

  const fetchCommit = async () => {

    try {

      const data =
        await getCommitById(id);

      setCommit(data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchCommit();

  }, []);

  if (!commit) {

    return (
      <MainLayout>
        <h1>Loading...</h1>
      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <div className="bg-gray-800 p-6 rounded-lg">

        <h1 className="text-3xl font-bold text-white mb-4">
          {commit.message}
        </h1>

        <p className="text-gray-400 mb-2">
          Author:
          {" "}
          {commit.author?.username}
        </p>

        <p className="text-gray-500 mb-6">
          {
            new Date(
              commit.createdAt
            ).toLocaleString()
          }
        </p>

        <h2 className="text-2xl text-white mb-4">
          Files
        </h2>

        <div className="space-y-3">

          {commit.files?.map((file) => (

            <div
              key={file._id}
              className="bg-gray-700 p-4 rounded"
            >

              <h3 className="text-white">
                {file.name}
              </h3>

              <a
                href={file.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 text-sm"
              >
                View File
              </a>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>

  );
}

export default CommitDetails;