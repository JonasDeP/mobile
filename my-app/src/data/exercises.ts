export interface ExerciseItem {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: string;
}

export const EXERCISES: ExerciseItem[] = [
  { id: '1', name: 'Bankdrukken', muscleGroup: 'Borst', difficulty: 'Gevorderd' },
  { id: '2', name: 'Incline Bench Press', muscleGroup: 'Borst', difficulty: 'Gevorderd' },
  { id: '3', name: 'Cable Fly', muscleGroup: 'Borst', difficulty: 'Gemiddeld' },
  { id: '4', name: 'Squats', muscleGroup: 'Benen', difficulty: 'Beginner' },
  { id: '5', name: 'Leg Press', muscleGroup: 'Benen', difficulty: 'Gemiddeld' },
  { id: '6', name: 'Leg Curl', muscleGroup: 'Benen', difficulty: 'Beginner' },
  { id: '7', name: 'Deadlift', muscleGroup: 'Rug', difficulty: 'Expert' },
  { id: '8', name: 'Lat Pulldown', muscleGroup: 'Rug', difficulty: 'Gemiddeld' },
  { id: '9', name: 'Barbell Row', muscleGroup: 'Rug', difficulty: 'Gevorderd' },
  { id: '10', name: 'Shoulder Press', muscleGroup: 'Schouders', difficulty: 'Gevorderd' },
  { id: '11', name: 'Lateral Raise', muscleGroup: 'Schouders', difficulty: 'Beginner' },
  { id: '12', name: 'Bicep Curls', muscleGroup: 'Armen', difficulty: 'Beginner' },
  { id: '13', name: 'Tricep Pushdown', muscleGroup: 'Armen', difficulty: 'Beginner' },
  { id: '14', name: 'Hammer Curls', muscleGroup: 'Armen', difficulty: 'Gemiddeld' },
  { id: '15', name: 'Crunches', muscleGroup: 'Buik', difficulty: 'Beginner' },
  { id: '16', name: 'Plank', muscleGroup: 'Buik', difficulty: 'Gemiddeld' },
  { id: '17', name: 'Leg Raises', muscleGroup: 'Buik', difficulty: 'Gevorderd' },
  { id: '18', name: 'Chest Dip', muscleGroup: 'Borst', difficulty: 'Gevorderd' },
  { id: '19', name: 'Romanian Deadlift', muscleGroup: 'Benen', difficulty: 'Gevorderd' },
  { id: '20', name: 'Calf Raise', muscleGroup: 'Benen', difficulty: 'Beginner' },
  { id: '21', name: 'Face Pull', muscleGroup: 'Schouders', difficulty: 'Beginner' },
  { id: '22', name: 'Preacher Curl', muscleGroup: 'Armen', difficulty: 'Gemiddeld' },
];

export const MUSCLE_GROUPS = ['Alles', 'Borst', 'Rug', 'Benen', 'Schouders', 'Armen', 'Buik'];