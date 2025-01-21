import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/routes/App";
import Login from "@/routes/Login";
import AuthGuard from "@/auth/AuthGuard";
import Root from "@/routes/Root";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "./pages/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // Public Routes
      { path: "/login", element: <Login /> },
      {
        // Private Routes
        path: "/",
        element: <AuthGuard />,
        children: [
          {
            path: "/",
            element: <App />,
            children: [{ path: "/", element: <HomePage /> }],
          },
        ],
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
