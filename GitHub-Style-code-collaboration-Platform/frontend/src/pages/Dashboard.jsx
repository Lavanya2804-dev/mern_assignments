import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import RepoCard from "../components/RepoCard";

import {
  getRepositories,
  createRepository,
} from "../services/repoService";

function Dashboard() {
  const [repos, setRepos] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const fetchRepos = async () => {
    try {
      const data = await getRepositories();

      setRepos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateRepo = async (e) => {
    e.preventDefault();

    try {
      await createRepository(formData);

      alert("Repository Created");

      setFormData({
        name: "",
        description: "",
      });

      fetchRepos();
    } catch (error) {
      console.log(error);

      alert("Failed to create repository");
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
      </div>

      {/* CREATE REPOSITORY FORM */}

      <form
        onSubmit={handleCreateRepo}
        className="bg-gray-800 p-6 rounded-lg mb-8"
      >
        <h2 className="text-2xl mb-4">
          Create Repository
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Repository Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700"
        />

        <button className="bg-blue-500 px-6 py-3 rounded">
          Create
        </button>
      </form>

      {/* REPOSITORIES */}

      <div className="grid md:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo._id} repo={repo} />
        ))}
      </div>
    </MainLayout>
  );
}

export default Dashboard;