import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  const status = error?.status || 500;
  const message =
    error?.data || error?.statusText || "Something went wrong";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-red-500 mb-4">
          {status}
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Page not found
        </h2>

        {/* Message */}
        <p className="text-gray-500 mb-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">

          {/* Go Home */}
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go Home
          </button>

          {/* Go Back */}
          <button
            onClick={() => navigate(-1)}
            className="border px-5 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Go Back
          </button>

        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;