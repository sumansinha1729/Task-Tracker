import { useEffect, useState } from "react";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import { loadTasks, saveTasks } from "./utils/LocalStorage";

function App() {
  const [username, setUsername] = useState("");
 const [tasks, setTasks] = useState([]);
const [hasLoaded, setHasLoaded] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load user and theme on first render
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) setUsername(savedUser);

    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") setDarkMode(true);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Load tasks
 useEffect(() => {
  const loaded = loadTasks();
  setTasks(loaded);
  setHasLoaded(true); 
}, []);

  // Save tasks
 useEffect(() => {
  if (hasLoaded) {
    saveTasks(tasks);
  }
}, [tasks, hasLoaded]);

  // Handlers
  const handleLogin = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
  };

  const addTask = (task) => setTasks([task, ...tasks]);

  const deleteTask = (id) =>
    setTasks(tasks.filter((task) => task.id !== id));

  const toggleTask = (id) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  const editTask = (id, newTitle, newDescription, newPriority, newDueDate, newTags) =>
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: newTitle,
            description: newDescription,
            priority: newPriority,
            dueDate: newDueDate,
            tags: newTags.split(",").map((tag) => tag.trim()),
          }
        : task
    )
  );


  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  // Search
  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Task counts
  const taskCounts = {
    All: tasks.length,
    Completed: tasks.filter((t) => t.completed).length,
    Pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="min-h-screen  bg-gray-400 dark:bg-gray-800 p-4 overflow-y-scroll hide-scrollbar">
      {username ? (
        <div className="max-w-xl mx-auto max-h-[95vh]">
          {/* Dark Mode Toggle */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Welcome, {username}
            </h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded bg-gray-800 text-white dark:bg-white dark:text-black"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

          {/* Task Input Form */}
          <TaskForm addTask={addTask} />

          {/* Filters */}
          <TaskFilter
            current={filter}
            setFilter={setFilter}
            taskCounts={taskCounts}
          />

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded mb-4 dark:bg-gray-700 dark:text-white"
          />

          {/* Task List */}
          <TaskList
            tasks={searchedTasks}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onEdit={editTask}
          />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
