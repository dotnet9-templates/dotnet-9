import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../home/HomePage";
import ReactivityDashboard from "../../features/reactivities/dashboard/ReactivityDashboard";
import ReactivityForm from "../../features/reactivities/form/ReactivityForm";
import ReactivityDetailPage from "../../features/reactivities/details/ReactivityDetailPage";
import Counter from "../../features/counter/Counter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "reactivities", element: <ReactivityDashboard /> },
      { path: "reactivities/:reactivityId", element: <ReactivityDetailPage /> }, // must match the reactivityId in the ReactivityDetailPage component.
      { path: "createActivity", element: <ReactivityForm key="create" /> },
      { path: "manage/:reactivityId", element: <ReactivityForm /> }, // edit reactivity form. must match the reactivityId in the ReactivityForm component. e.g. id vs reactivityId.
      { path: "counter", element: <Counter /> },
    ],
  },
]);
