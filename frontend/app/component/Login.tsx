"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type FormType = {
  username: string;
  email: string;
  password: string;
};

const Login = () => {
  const [form, setForm] = useState<FormType>({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const formHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(form)
    localStorage.setItem('username',form.username);
     router.push("/"); 
  }

  return (
    <div className="flex gap-25 ">
      <div className="border">
        <Image
          className="h-screen"
          src="/TaskLogo.png"
          alt="Task Logo"
          width={900}
          height={8020}
          loading="eager"
          priority
        />
      </div>

      <div className="flex justify-center items-center h-screen ">
        <form className="flex flex-col gap-5  p-15 shadow-md">
          <div className="flex justify-center">
            <h1 className="font-semibold h-5">Login</h1>
          </div>
          <input
            className="border p-2 rounded-sm w-[250px]"
            name="username"
            type="text"
            placeholder="Enter your name"
            value={form.username}
            onChange={formHandler}
            required
          />

          <input
            className="border p-2 rounded-sm w-[250px]"
            name="email"
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={formHandler}
            required
          />

          <input
            className="border p-2 rounded-sm w-[250px]"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={formHandler}
            required
          />

          <button onClick={submitHandler} className="border p-2 rounded-sm w-[250px] bg-blue-500">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;