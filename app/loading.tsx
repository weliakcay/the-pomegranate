export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--ink-dim)]/20 border-t-[var(--nar)]" />
        <p className="text-sm text-[var(--ink-dim)]">Loading...</p>
      </div>
    </div>
  );
}
