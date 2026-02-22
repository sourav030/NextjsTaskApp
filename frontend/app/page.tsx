"use client";

import Header from "./component/Header";
import Login from "./component/Login";
import { useState, useEffect } from "react";

type Task = {
    id: string;
    title: string;
    description: string;
    deadline: string;
    createdAt: string;
};

const Page = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    // 🔐 Auth + Load Tasks
    useEffect(() => {
        const user = localStorage.getItem("username");
        setUsername(user);

        const storedTasks = JSON.parse(
            localStorage.getItem("tasks") || "[]"
        );
        setTasks(storedTasks);
    }, []);

    // 🗑️ Delete Task
    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    if (!username) {
        return <Login />;
    }

    return (
        <div>
            <Header username={username} />

            <div className="mx-auto mt-6 max-w-4xl px-4">
                <h2 className="mb-4 text-xl font-bold">My Tasks</h2>

                {tasks.length === 0 && (
                    <p className="text-gray-500">No tasks created yet.</p>
                )}

                <div className="grid gap-4">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="rounded-lg border bg-white p-4 shadow"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">
                                    {task.title}
                                </h3>

                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>

                            {task.description && (
                                <p className="mt-2 text-gray-600">
                                    {task.description}
                                </p>
                            )}

                            <p className="mt-2 text-sm text-gray-500">
                                Deadline: <span className="font-medium">{task.deadline}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
