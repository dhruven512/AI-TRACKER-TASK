import TaskItem from "./TaskItem.jsx";

export default function TaskList({
  tasks,
  allTasksCount,
  editingId,
  editingTitle,
  setEditingTitle,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  return (
    <div className="border-t border-slate-200 dark:border-slate-800">
      {tasks.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            No tasks found
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {allTasksCount === 0
              ? "Add your first task above."
              : "Try switching filters."}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isEditing={editingId === task.id}
              editingTitle={editingTitle}
              setEditingTitle={setEditingTitle}
              onToggle={onToggle}
              onStartEdit={onStartEdit}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
