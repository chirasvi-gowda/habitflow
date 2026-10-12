import { useState } from "preact/hooks";

export default function HabitTracker() {
  const [habits, setHabits] = useState([
    { name: "Exercise", completed: true },
    { name: "Read 30 Minutes", completed: false },
    { name: "Practice TypeScript", completed: false },
  ]);

  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (newHabit.trim() === "") return;

    setHabits([
      ...habits,
      {
        name: newHabit,
        completed: false,
      },
    ]);

    setNewHabit("");
  };

  const deleteHabit = (habitToDelete: string) => {
    setHabits(
      habits.filter(
        (habit) => habit.name !== habitToDelete,
      ),
    );
  };

  const toggleComplete = (habitName: string) => {
    setHabits(
      habits.map((habit) =>
        habit.name === habitName
          ? {
              ...habit,
              completed: !habit.completed,
            }
          : habit
      ),
    );
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex gap-3 mb-4">
        <input
          type="text"
          value={newHabit}
          onInput={(e) =>
            setNewHabit(e.currentTarget.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addHabit();
            }
          }}
          placeholder="Enter a habit..."
          class="flex-1 border rounded-lg p-3"
        />

        <button
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
          Completed: {
            habits.filter(
              (habit) => habit.completed,
            ).length
          }
        </p>

        <p class="text-orange-600">
          Remaining: {
            habits.filter(
              (habit) => !habit.completed,
            ).length
          }
        </p>
      </div>

      <h2 class="text-xl font-semibold mb-3">
        My Habits
      </h2>

      {habits.map((habit) => (
        <div class="border p-3 rounded mb-2 flex justify-between items-center">
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() =>
                toggleComplete(habit.name)
              }
              class="w-5 h-5"
            />

            <span>
              {habit.name}
            </span>
          </label>

          <button
            onClick={() =>
              deleteHabit(habit.name)
            }
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}