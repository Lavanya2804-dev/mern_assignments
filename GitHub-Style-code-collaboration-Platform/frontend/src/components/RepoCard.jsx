import { Link } from "react-router-dom";

function RepoCard({ repo }) {
  return (
    <Link to={`/repository/${repo._id}`}>
      <div className="bg-gray-800 p-5 rounded-lg shadow hover:bg-gray-700 transition">
        <h2 className="text-xl font-bold text-blue-400">
          {repo.name}
        </h2>

        <p className="text-gray-300 mt-2">
          {repo.description}
        </p>
      </div>
    </Link>
  );
}

export default RepoCard;