function IconPencil(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 20h9"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTrash(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 6h18"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 6V4h8v2m-9 0 1 16h8l1-16"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 11v6M14 11v6"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m20 6-11 11-5-5"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6 6 18"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TaskItem({
  task,
  isEditing,
  editingTitle,
  setEditingTitle,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  return (
    <li className="group flex items-start gap-3 px-4 py-4 transition hover:bg-slate-50/70 sm:px-6 dark:hover:bg-slate-950/30">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        disabled={isEditing}
        className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md border border-slate-300 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200 active:translate-y-0 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-slate-500 dark:focus:ring-slate-800"
        aria-label={
          task.completed
            ? "Mark task as not completed"
            : "Mark task as completed"
        }
        aria-pressed={task.completed}
      >
        {task.completed ? (
          <IconCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
        ) : null}
      </button>

      <div className="flex-1">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveEdit(task.id);
                if (e.key === "Escape") onCancelEdit();
              }}
              className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-200/60 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-700 dark:focus:ring-slate-800"
              aria-label="Edit task title"
              autoFocus
            />

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSaveEdit(task.id)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200 active:translate-y-0 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus:ring-slate-800"
              >
                <IconCheck className="h-4 w-4" />
                Save
              </button>
              <button
                type="button"
                onClick={onCancelEdit}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200 active:translate-y-0 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus:ring-slate-800"
              >
                <IconX className="h-4 w-4" />
                Cancel
              </button>
              <p className="self-center text-xs text-slate-500 dark:text-slate-400">
                Enter to save • Esc to cancel
              </p>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            className="w-full text-left"
            aria-label="Toggle task"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={[
                  "text-sm font-medium transition",
                  task.completed
                    ? "text-slate-400 line-through dark:text-slate-500"
                    : "text-slate-900 dark:text-slate-100",
                ].join(" ")}
              >
                {task.title}
              </span>

              {task.completed ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  Completed
                </span>
              ) : (
                <span className="rounded-full bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
                  Active
                </span>
              )}
            </div>

            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {task.completed
                ? "Nice work — keep it going."
                : "One step at a time."}
            </div>
          </button>
        )}
      </div>

      <div className="flex flex-none items-center gap-2">
        <button
          type="button"
          onClick={() => onStartEdit(task)}
          disabled={isEditing}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus:ring-slate-800"
          aria-label="Edit task"
        >
          <IconPencil className="h-4 w-4" />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-rose-200 active:translate-y-0 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-rose-500/30 dark:hover:bg-rose-500/10 dark:hover:text-rose-200 dark:focus:ring-rose-900/40"
          aria-label="Delete task"
        >
          <IconTrash className="h-4 w-4" />
          Delete
        </button>
      </div>
    </li>
  );
}
