import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthForm from "./components/SignUp.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Otp from "./components/Otp.tsx";
import Dashboard from "./components/Dashboard.tsx";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ChatProfile from "./components/profile.tsx";
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./store/store.ts";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <AuthForm />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <ChatProfile />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      </PersistGate>
     
    </Provider>
  </QueryClientProvider>
);
