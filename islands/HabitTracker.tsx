import { useEffect, useState } from "preact/hooks";

interface Habit {
  id: number;
  name: string;
  completed: boolean;
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    try {
      const response = await fetch("/api/habits");

      if (!response.ok) {
        throw new Error("Could not load habits.");
      }

      const data = await response.json() as Habit[];
      setHabits(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addHabit() {
    const name = newHabit.trim();

    if (name === "") {
      return;
    }

    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      console.error("Could not add habit.");
      return;
    }

    setNewHabit("");
    await loadHabits();
  }

  async function toggleComplete(habit: Habit) {
    const response = await fetch("/api/habits", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: habit.id,
        completed: !habit.completed,
      }),
    });

    if (!response.ok) {
      console.error("Could not update habit.");
      return;
    }

    await loadHabits();
  }

  async function deleteHabit(id: number) {
    const response = await fetch("/api/habits", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (!response.ok) {
      console.error("Could not delete habit.");
      return;
    }

    await loadHabits();
  }

  const completedCount = habits.filter(
    (habit) => habit.completed,
  ).length;

  const remainingCount = habits.length - completedCount;

  return (
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex gap-3 mb-4">
        <input
          type="text"
          value={newHabit}
          onInput={(event) =>
            setNewHabit(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addHabit();
            }
          }}
          placeholder="Enter a habit..."
          class="flex-1 border rounded-lg p-3"
        />

        <button
          type="button"
          onClick={addHabit}
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Add Habit
        </button>
      </div>

      <div class="mb-4 p-4 bg-gray-100 rounded-lg">
        <p class="font-medium">
          Total Habits: {habits.length}
        </p>

        <p class="text-green-600">
          Completed: {completedCount}
        </p>

        <p class="text-orange-600">
          Remaining: {remainingCount}
        </p>
      </div>

      <h2 class="text-xl font-semibold mb-3">
        My Habits
      </h2>

      {loading ? (
        <p class="text-gray-500">
          Loading habits...
        </p>
      ) : habits.length === 0 ? (
        <p class="text-gray-500">
          No habits yet. Add your first habit above!
        </p>
      ) : (
        habits.map((habit) => (
          <div
            key={habit.id}
            class="border p-3 rounded mb-2 flex justify-between items-center"
          >
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleComplete(habit)}
                class="w-5 h-5"
              />

              <span>{habit.name}</span>
            </label>

            <button
              type="button"
              onClick={() => deleteHabit(habit.id)}
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}