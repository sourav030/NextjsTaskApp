"use client";

import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  username: string | null;
};

const Header = ({ username }: HeaderProps) => {
  const logoutHandler = () => {
    localStorage.removeItem("username");
    window.location.reload(); // simple refresh for now
  };

  return (
    <header className="w-full shadow-md bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-2">
          <Image
            src="/NavLogo.png"
            alt="Task Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-lg font-bold">
            TaskApp
          </span>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-black transition font-bold"
          >
            Home
          </Link>

          <Link
            href="/createtask"
            className="text-gray-600 hover:text-black transition font-bold"
          >
            Create Task
          </Link>
        </nav>

        {/* Right: User + Logout */}
        <div className="flex items-center gap-4">
          {username && (
            <span className="text-sm text-gray-600">
              Hello <span className="font-semibold">{username}</span>
            </span>
          )}

          <button
            onClick={logoutHandler}
            className="rounded-md bg-red-500 px-4 py-1.5 text-sm text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;