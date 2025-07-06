const TaskFilter = ({ current, setFilter, taskCounts }) => {
  const filters = ["All", "Completed", "Pending"];

  return (
    <div className="flex gap-4 mb-6 justify-center ">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1 rounded ${
            current === f
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          {f} ({taskCounts[f] || 0})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
