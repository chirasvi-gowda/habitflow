import { habits } from "../../lib/db.ts";
import { define } from "../../utils.ts";

export const handler = define.handlers({
  GET() {
    return Response.json(habits);
  },

  async POST(ctx) {
    const body = await ctx.req.json() as {
      name?: string;
    };

    const name = String(body.name ?? "").trim();

    if (name === "") {
      return Response.json(
        { error: "Habit name is required." },
        { status: 400 },
      );
    }

    const habit = {
      id: Date.now(),
      name,
      completed: false,
    };

    habits.push(habit);

    return Response.json(
      {
        success: true,
        habit,
      },
      {
        status: 201,
      },
    );
  },

  async PATCH(ctx) {
    const body = await ctx.req.json() as {
      id?: number;
      completed?: boolean;
    };

    const id = Number(body.id);

    const habit = habits.find(
      (currentHabit) => currentHabit.id === id,
    );

    if (!habit) {
      return Response.json(
        { error: "Habit not found." },
        { status: 404 },
      );
    }

    habit.completed = Boolean(body.completed);

    return Response.json({
      success: true,
      habit,
    });
  },

  async DELETE(ctx) {
    const body = await ctx.req.json() as {
      id?: number;
    };

    const id = Number(body.id);

    const habitIndex = habits.findIndex(
      (habit) => habit.id === id,
    );

    if (habitIndex === -1) {
      return Response.json(
        { error: "Habit not found." },
        { status: 404 },
      );
    }

    habits.splice(habitIndex, 1);

    return Response.json({
      success: true,
    });
  },
});