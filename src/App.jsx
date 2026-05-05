import { useEffect, useMemo, useState } from "react";
import TaskInput from "./components/TaskInput.jsx";
import TaskList from "./components/TaskList.jsx";

const TASKS_KEY = "task-tracker.tasks.v1";
const THEME_KEY = "task-tracker.theme.v1"; // "light" | "dark"

function IconSun(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        className="stroke-current"
        strokeWidth="2"
      />
      <path
        d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.64 5.64 4.22 4.22M19.78 19.78l-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMoon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M21 13.2A8.5 8.5 0 0 1 10.8 3a7.5 7.5 0 1 0 10.2 10.2Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(TASKS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"
  const [searchText, setSearchText] = useState("");

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === "dark" || saved === "light" ? saved : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }

    const root = document.documentElement; // <html>
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const remainingCount = useMemo(
    () => tasks.reduce((acc, t) => acc + (t.completed ? 0 : 1), 0),
    [tasks],
  );
  const completedCount = tasks.length - remainingCount;

  const visibleTasks = useMemo(() => {
    const q = searchText.trim().toLowerCase();

    const statusFiltered =
      filter === "active"
        ? tasks.filter((t) => !t.completed)
        : filter === "completed"
          ? tasks.filter((t) => t.completed)
          : tasks;

    if (!q) return statusFiltered;
    return statusFiltered.filter((t) =>
      String(t.title).toLowerCase().includes(q),
    );
  }, [tasks, filter, searchText]);

  function addTask(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      { id: crypto.randomUUID(), title: trimmed, completed: false },
      ...prev,
    ]);
    setTitle("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditingTitle(task.title);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingTitle("");
  }

  function saveEdit(id) {
    const trimmed = editingTitle.trim();
    if (!trimmed) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t)),
    );
    cancelEdit();
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) cancelEdit();
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
    if (editingId && tasks.some((t) => t.id === editingId && t.completed)) {
      cancelEdit();
    }
  }

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
        <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              AI Task Tracker
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Plan better. Build consistency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200 active:translate-y-0 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800/70 dark:focus:ring-slate-800"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <>
                  <IconSun className="h-4 w-4" />
                  Light
                </>
              ) : (
                <>
                  <IconMoon className="h-4 w-4" />
                  Dark
                </>
              )}
            </button>

            <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {[
                { id: "all", label: "All" },
                { id: "active", label: "Active" },
                { id: "completed", label: "Completed" },
              ].map((opt) => {
                const active = filter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFilter(opt.id)}
                    className={[
                      "rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-4",
                      active
                        ? "bg-slate-900 text-white shadow-sm focus:ring-slate-200 dark:bg-slate-100 dark:text-slate-900 dark:focus:ring-slate-800"
                        : "text-slate-700 hover:bg-slate-50 focus:ring-slate-200 dark:text-slate-200 dark:hover:bg-slate-800/70 dark:focus:ring-slate-800",
                    ].join(" ")}
                    aria-pressed={active}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="relative">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search…"
                className="w-44 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-700 dark:focus:ring-slate-800 sm:w-56"
                aria-label="Search tasks"
              />
            </div>

            <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <span className="font-medium">{remainingCount}</span> remaining
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <span className="font-medium">{completedCount}</span> done
            </div>
          </div>
        </header>

        <main className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(700px_circle_at_20%_0%,rgba(99,102,241,0.10),transparent_60%),radial-gradient(700px_circle_at_80%_20%,rgba(16,185,129,0.10),transparent_55%)] dark:opacity-50" />

          <TaskInput
            title={title}
            setTitle={setTitle}
            onAddTask={addTask}
            onClearCompleted={clearCompleted}
            clearCompletedDisabled={completedCount === 0}
          />

          <TaskList
            tasks={visibleTasks}
            allTasksCount={tasks.length}
            editingId={editingId}
            editingTitle={editingTitle}
            setEditingTitle={setEditingTitle}
            onToggle={toggleTask}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            onDelete={deleteTask}
          />
        </main>

        <footer className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          AI-powered Task Tracker • Built by Dhruven Parekh
        </footer>
      </div>
    </div>
  );
}
