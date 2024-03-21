"use client";
import React from "react";
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar.jsx";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    mobile: "",
  });

  const onLogin = async () => {
    const res = await axios.post("/api/login", user)
    const res1 = await axios.get("/api/me");
    console.log(res1);
    window.location.href = `/dashboard/${res1.data.data.id}`;
  }
    
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen gradient-bg-services">
        <h1 className="text-white">Hello from Login</h1>
        <input
          className="p-2 m-2 gradient-bg-footer border-white border-[1px] rounded-md text-white"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <input
          className="p-2 m-2 gradient-bg-footer border-white border-[1px] rounded-md text-white"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <div className="p-2 m-2 bg-[#2952e3] rounded-md cursor-pointer hover:bg-[#2546bd]" onClick={onLogin}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Page;
