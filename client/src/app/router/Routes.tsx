import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../home/HomePage";
import ReactivityDashboard from "../../features/reactivities/dashboard/ReactivityDashboard";
import ReactivityForm from "../../features/reactivities/form/ReactivityForm";
import ReactivityDetailPage from "../../features/reactivities/details/ReactivityDetailPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/error/TestErrors";
import NotFound from "../../features/error/NotFound";
import ServerError from "../../features/error/ServerError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "reactivities", element: <ReactivityDashboard /> },
      { path: "reactivities/:reactivityId", element: <ReactivityDetailPage /> },
      { path: "createActivity", element: <ReactivityForm key="create" /> },
      { path: "manage/:reactivityId", element: <ReactivityForm /> },
      { path: "counter", element: <Counter /> },
      { path: "errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
