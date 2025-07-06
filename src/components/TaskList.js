import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-300">No tasks found.</p>
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
