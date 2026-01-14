"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import TaskModal from "./TaskModal";

type Task = {
  _id: string;
  title: string;
  status: "Pending" | "Completed";
  createdAt: string;
};

export default function TasksSection() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to load tasks ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Add task
  const handleAddTask = async (title: string) => {
    try {
      await api.post("/tasks", { title, status: "Pending" });
      setOpenModal(false);
      fetchTasks();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to add task ❌");
    }
  };

  // ✅ Delete task
  const handleDeleteTask = async (id: string) => {
    const ok = confirm("Delete this task?");
    if (!ok) return;

    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete task ❌");
    }
  };

  // ✅ Toggle status
  const toggleStatus = async (task: Task) => {
    try {
      const newStatus = task.status === "Pending" ? "Completed" : "Pending";
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      fetchTasks();
    } catch (err: any) {
      alert("Failed to update status ❌");
    }
  };

  // ✅ Edit title
  const editTaskTitle = async (task: Task) => {
    const newTitle = prompt("Edit task title:", task.title);
    if (!newTitle || !newTitle.trim()) return;

    try {
      await api.put(`/tasks/${task._id}`, { title: newTitle.trim() });
      fetchTasks();
    } catch (err: any) {
      alert("Failed to edit title ❌");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" ? true : t.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Tasks</h2>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Task
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading tasks...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Title</th>
                <th>Status</th>
                <th>Created</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id} className="border-b">
                  <td className="py-3">{task.title}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td>{new Date(task.createdAt).toLocaleDateString()}</td>

                  <td className="text-right space-x-4">
                    <button
                      className="text-indigo-600 hover:underline"
                      onClick={() => toggleStatus(task)}
                    >
                      {task.status === "Pending" ? "Mark Done" : "Mark Pending"}
                    </button>

                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => editTaskTitle(task)}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <TaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={(title: string) => handleAddTask(title)}
      />
    </div>
  );
}
