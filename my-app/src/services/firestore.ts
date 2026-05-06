import firebase from './firebase';
import { Workout, WorkoutHistoryEntry } from '../types';

const db = firebase.firestore();

export const getWorkoutSchemas = async (uid: string): Promise<Workout[]> => {
  const snapshot = await db.collection('users').doc(uid).collection('workouts').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Workout));
};

export const saveWorkout = async (uid: string, workout: Workout): Promise<void> => {
  await db.collection('users').doc(uid).collection('workouts').add(workout);
};

export const getWorkoutHistory = async (uid: string): Promise<WorkoutHistoryEntry[]> => {
  const snapshot = await db
    .collection('users')
    .doc(uid)
    .collection('history')
    .orderBy('completedAt', 'desc')
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as WorkoutHistoryEntry));
};

export const addToHistory = async (uid: string, entry: WorkoutHistoryEntry): Promise<void> => {
  await db.collection('users').doc(uid).collection('history').add(entry);
};

export const deleteWorkout = async (uid: string, workoutId: string): Promise<void> => {
  await db.collection('users').doc(uid).collection('workouts').doc(workoutId).delete();
};
