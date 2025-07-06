import { useState } from "react";

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority || "Low");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [tags, setTags] = useState((task.tags || []).join(", "));

  const handleEdit = () => {
    onEdit(task.id, title, description, priority, dueDate, tags);
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 border border-gray-700 rounded shadow space-y-2 transition-all duration-300 ease-in-out transform hover:scale-[1.01] ${
        task.completed ? "bg-green-100 dark:bg-green-800" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            className="w-full px-2 py-1 rounded border dark:bg-gray-700 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg dark:text-white">{task.title}</h3>
            <span
              className={`text-xs font-semibold ${
                task.priority === "High"
                  ? "text-red-500"
                  : task.priority === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              [{task.priority}]
            </span>
          </div>
        )}

        <span
          className={`text-sm font-semibold ${
            task.completed ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {task.completed ? "✔ Done" : "⏳ Pending"}
        </span>
      </div>

      {/* Description */}
      {isEditing ? (
        <textarea
          className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
      )}

      {/* Priority */}
      {isEditing && (
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      )}

      {/* Due Date */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Created at: {new Date(task.createdAt).toLocaleString()}
      </p>

      {isEditing ? (
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:text-white"
        />
      ) : (
        task.dueDate && (
          <p className="text-xs text-purple-600 dark:text-purple-400">
            Due: {task.dueDate}
          </p>
        )
      )}

      {/* Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onToggle(task.id)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Toggle
        </button>

        {isEditing ? (
          <button
            onClick={handleEdit}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this task?")) {
              onDelete(task.id);
            }
          }}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
