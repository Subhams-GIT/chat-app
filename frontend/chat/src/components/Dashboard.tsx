import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import Navbar from "./Layout/Navbar";
import GetUser from "@/Functions/GetUser";
import { setUser } from "@/Context/AuthContext";

const Dashboard = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: GetUser,
    onSuccess: (res) => {
      dispatch(setUser(res.data.user));
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []); // run once on mount

  if (mutation.isPending) {
    return (
      <div className="flex h-screen w-screen justify-center items-center font-bold animate-spin text-black">
        <LoaderCircle />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="text-white text-xl p-4">Dashboard content here</div>
    </div>
  );
};

export default Dashboard;
