"use client";

import Header from "./component/Header";
import Login from "./component/Login";
import { useState, useEffect } from "react";

const Page = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);
  },);

  const logoutHandler = () => {
    localStorage.removeItem("username");
    setUsername(null);
  };

  if (!username) {
    return <Login />;
  }

  return (
    <div>
      
      
      <Header username={username}/>
    </div>
  );
};

export default Page;