export interface Habit {
  id: number;
  name: string;
  completed: boolean;
}

export const habits: Habit[] = [];