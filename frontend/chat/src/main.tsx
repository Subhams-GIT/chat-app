import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthForm from "./components/SignUp.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Otp from "./components/Otp.tsx";

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
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
