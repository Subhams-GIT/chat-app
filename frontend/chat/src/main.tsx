import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthForm from "./components/SignUp.tsx";
import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import Otp from "./components/Otp.tsx";
import Dashboard from "./components/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <AuthForm/>,
  },
  {
    path: "/otp",
    element: <Otp/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
