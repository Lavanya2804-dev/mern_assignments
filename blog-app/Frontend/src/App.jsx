import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import AuthorDashboard from "./components/AuthorDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ArticleByID from "./components/ArticleById";
import AuthorArticles from "./components/AuthorArticles";
import WriteArticle from "./components/WriteArticle";
import { Toaster } from "react-hot-toast";
import EditArticleForm from "./components/EditArticleForm";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";


function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement:<ErrorBoundary></ErrorBoundary>,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
       
         {
  path: "user-profile",
  element: (
    <ProtectedRoute allowedRoles={["USER"]}>
      <UserDashboard />
    </ProtectedRoute>
  ),
},
        {
          path: "author-profile",
          element: (
    <ProtectedRoute allowedRoles={["AUTHOR"]}>
          <AuthorDashboard />,
          </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <AuthorArticles />,
            },
            {
              path: "articles",
              element: <AuthorArticles />,
            },
            {
              path: "write-article",
              element: <WriteArticle />,
            },
          ],
        },
        {
  path: "article/:id",
  element: (
    <ProtectedRoute allowedRoles={["USER", "AUTHOR"]}>
      <ArticleByID />
    </ProtectedRoute>
  ),
},
        {
          path: "edit-article/:id",
          element: (
           <ProtectedRoute allowedRoles={["AUTHOR"]}>
          <EditArticleForm />
          </ProtectedRoute>
          )
        },
        {
          path:"admin-profile",
          element:(
            <ProtectedRoute allowedRoles={["ADMIN"]}>
          <AdminDashboard />
          </ProtectedRoute>
          )
        },
        {
          path:"unauthorized",
          element:<Unauthorized/>
        }
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routerObj} />
    </>
  );
}

export default App;