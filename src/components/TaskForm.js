import { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      dueDate,
      tags: tags.split(",").map((tag) => tag.trim()),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);
    // Clear form
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
    setTags("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mb-6 p-4 bg-white border border-gray-700 dark:bg-gray-900 rounded shadow"
    >
      {/* Task Title */}
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
        required
      />
       
      {/* Description */}
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
      />
       
      <div className="flex">
        {/* Priority Dropdown */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
      />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
