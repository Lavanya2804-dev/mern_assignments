import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Repository from "./pages/Repository";
import Issues from "./pages/Issues";
import PullRequests from "./pages/PullRequests";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";
import Activity
from "./pages/Activity";
import CommitDetails from "./pages/CommitDetails"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/repository/:id"
        element={
          <ProtectedRoute>
            <Repository />
          </ProtectedRoute>
        }
      />

      <Route
  path="/repo/:id/pull-requests"
  element={
    <ProtectedRoute>
      <PullRequests />
    </ProtectedRoute>
  }
/>


      <Route
  path="/repo/:id/issues"
  element={
    <ProtectedRoute>
      <Issues />
    </ProtectedRoute>
  }
/>


      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
  path="/activity"
  element={<Activity />}
/>

<Route
  path="/commit/:id"
  element={<CommitDetails />}
/>

    </Routes>
  );
}

export default App;