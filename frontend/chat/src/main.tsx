import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthForm from "./components/SignUp.tsx";
import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import Otp from "./components/Otp.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

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
 
    <QueryClientProvider client={queryClient}>
       <Provider store={store}>
    <RouterProvider router={router} />
 </Provider></QueryClientProvider>
   
  
 
  
 
);
