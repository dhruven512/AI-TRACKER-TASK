import { useEffect, useRef } from "react";

function IconPlus(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 5v14M5 12h14"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TaskInput({
  title,
  setTitle,
  onAddTask,
  onClearCompleted,
  clearCompletedDisabled,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    onAddTask(e);
    // After adding (App clears title), put focus back for fast entry
    queueMicrotask(() => inputRef.current?.focus());
  }

  return (
    <div className="relative p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task…"
            className="w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-200/60 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-700 dark:focus:ring-slate-800"
            aria-label="Task title"
          />
          <div className="pointer-events-none absolute inset-y-0 right-3 hidden items-center text-xs text-slate-400 sm:flex dark:text-slate-500">
            Enter
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200 active:translate-y-0 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus:ring-slate-800"
        >
          <IconPlus className="h-4 w-4" />
          Add task
        </button>
      </form>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tip: Click a task to mark it completed.
        </p>

        <button
          type="button"
          onClick={onClearCompleted}
          disabled={clearCompletedDisabled}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
