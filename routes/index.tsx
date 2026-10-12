import HabitTracker from "../islands/HabitTracker.tsx";

export default function Home() {
  return (
    <main class="min-h-screen bg-slate-100 p-8">
      <div class="mx-auto max-w-2xl">
        <h1 class="mb-4 text-center text-4xl font-bold">
          HabitFlow
        </h1>

        <p class="mb-8 text-center text-gray-600">
          Build better habits, one day at a time.
        </p>

        <HabitTracker />
      </div>
    </main>
  );
}