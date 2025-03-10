import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/routes/App";
import Login from "@/routes/Login";
import AuthGuard from "@/auth/AuthGuard";
import Root from "@/routes/Root";

// Importing Pages
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/ErrorPage";
import CoursePage from "@/pages/courses/Courses";
import EditCourse from "@/pages/courses/EditCourse";
import AddCourse from "@/pages/courses/AddCourse";
import BatchPage from "@/pages/batches/Batches";
import BatchDetails from "@/pages/batches/BatchDetails";
import AddBatch from "@/pages/batches/AddBatch";
import EditBatch from "@/pages/batches/EditBatch";
import BatchLayout from "./layout/BatchLayout";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        // Public Routes
        { path: "login", element: <Login /> },
        {
          // Private Routes
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/",
              element: <App />,
              children: [
                { path: "/", element: <HomePage /> },
                {
                  path: "courses",
                  children: [
                    {
                      index: true,
                      element: <CoursePage />,
                    },
                    { path: "add", element: <AddCourse /> },
                    { path: "edit/:id", element: <EditCourse /> },
                  ],
                },
                {
                  path: "batches",
                  element: <BatchLayout />,
                  children: [
                    { index: true, element: <BatchPage /> },
                    { path: "add", element: <AddBatch /> },
                    { path: "edit/:id", element: <EditBatch /> },
                    { path: ":id", element: <BatchDetails /> },
                  ],
                },
              ],
            },
          ],
        },
      ],
      errorElement: <NotFoundPage />,
    },
  ],
);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
