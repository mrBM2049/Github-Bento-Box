import { useState } from "react";

export function HandleSearchTile({ login, name, onSearch }) {
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
      setEditing(false);
    }
  };

  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-5 min-h-[220px] rounded-bento bg-white text-prussian p-6 sm:p-7 flex flex-col justify-between border border-prussian/5 shadow-sm">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-dusk uppercase tracking-widest font-semibold">IDENTITY &amp; HANDLE</span>
        <button
          onClick={() => setEditing((prev) => !prev)}
          className="text-dusk hover:text-prussian underline decoration-teal decoration-2 underline-offset-4 transition-colors"
        >
          {editing ? "Cancel" : "Change User"}
        </button>
      </div>

      <div className="my-auto">
        {editing ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-3xl font-display text-dusk font-bold">@</span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="username + Enter"
              className="w-full text-2xl sm:text-3xl font-display uppercase tracking-tight text-prussian border-b-2 border-teal bg-transparent pb-1 focus:outline-none"
            />
          </form>
        ) : (
          <div
            onClick={() => setEditing(true)}
            title="Click to search another user"
            className="cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v10M7 12h10" />
              </svg>
              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-prussian leading-none truncate group-hover:text-teal transition-colors">
                @{login}
              </h1>
            </div>
            {name && (
              <p className="mt-2 text-sm font-sans text-dusk pl-11 truncate">
                {name}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-dusk">
        <span>PUBLIC GITHUB IDENTITY</span>
        <span className="text-teal font-semibold">ACTIVE PROFILE</span>
      </div>
    </div>
  );
}

