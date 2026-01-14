"use client";

import { useState } from "react";

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  initialTitle?: string;
};

export default function TaskModal({ open, onClose, onSave, initialTitle = "" }: TaskModalProps) {
  const [title, setTitle] = useState(initialTitle);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Add / Edit Task</h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(title);
              setTitle("");
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
