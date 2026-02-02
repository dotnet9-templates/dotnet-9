import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../home/HomePage";
import ReactivityDashboard from "../../features/reactivities/dashboard/ReactivityDashboard";
import ReactivityForm from "../../features/reactivities/form/ReactivityForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "reactivities", element: <ReactivityDashboard /> },
      { path: "createActivity", element: <ReactivityForm /> },
    ],
  },
]);
