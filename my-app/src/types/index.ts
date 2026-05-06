export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  description: string;
  sets: number;
  reps: number;
  weight: number;
  restTime: number;
}

export interface Workout {
  id: string;
  title: string;
  muscleGroup: string;
  duration: number;
  exercises: Exercise[];
  date: string;
}

export interface WorkoutHistoryEntry {
  id: string;
  workoutId: string;
  workoutTitle: string;
  completedAt: string;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weight: number;
    restTime: number;
  }[];
}

export interface FilterState {
  muscleGroup: string;
  difficulty: string;
}

export interface LogFormData {
  sets: string;
  reps: string;
  weight: string;
  restTime: string;
}

export interface ValidationErrors {
  sets?: string;
  reps?: string;
  weight?: string;
  restTime?: string;
}
