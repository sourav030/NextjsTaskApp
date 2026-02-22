'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../component/Header';

type Task = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  createdAt: string;
};

const Page = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const router = useRouter();

  // 🔐 Auth check
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (!storedUser) {
      router.replace('/');
    } else {
      setUsername(storedUser);
    }
  }, [router]);

  if (!username) return null;

  // ✅ Create Task
  const handleCreateTask = () => {
    if (!title || !deadline) {
      alert('Title and Deadline required');
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      deadline,
      createdAt: new Date().toISOString(),
    };

    const existingTasks = JSON.parse(
      localStorage.getItem('tasks') || '[]'
    );

    const updatedTasks = [...existingTasks, newTask];

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // reset form
    setTitle('');
    setDescription('');
    setDeadline('');

    alert('Task created successfully!');
  };

  return (
    <div>
      <Header username={username} />

      <div className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Create Task</h2>

        <input
          type="text"
          placeholder="Task Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="mb-4 w-full rounded border px-3 py-2"
        />

        <button
          onClick={handleCreateTask}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>
    </div>
  );
};

export default Page;