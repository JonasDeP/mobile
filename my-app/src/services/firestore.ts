import firebase from './firebase';
import 'firebase/compat/firestore';
import { Workout, WorkoutHistoryEntry, WeightEntry, GymVisit } from '../types';

const db = firebase.firestore();

export const getWorkoutSchemas = async (uid: string): Promise<Workout[]> => {
  const snapshot = await db.collection('users').doc(uid).collection('workouts').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Workout));
};

export const saveWorkout = async (uid: string, workout: Workout): Promise<string> => {
  const ref = await db.collection('users').doc(uid).collection('workouts').add(workout);
  return ref.id;
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

export const addToHistory = async (uid: string, entry: WorkoutHistoryEntry): Promise<string> => {
  const ref = await db.collection('users').doc(uid).collection('history').add(entry);
  return ref.id;
};

export const deleteWorkout = async (uid: string, workoutId: string): Promise<void> => {
  await db.collection('users').doc(uid).collection('workouts').doc(workoutId).delete();
};

export const saveWeightEntry = async (uid: string, weight: number): Promise<void> => {
  const entry: Omit<WeightEntry, 'id'> = { weight, date: new Date().toISOString() };
  await db.collection('users').doc(uid).collection('weights').add(entry);
};

export const getWeightHistory = async (uid: string): Promise<WeightEntry[]> => {
  const snapshot = await db
    .collection('users').doc(uid).collection('weights')
    .orderBy('date', 'asc').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as WeightEntry));
};

export const saveGymVisit = async (uid: string, date: string): Promise<string | null> => {
  const existing = await db.collection('users').doc(uid).collection('visits')
    .where('date', '==', date).limit(1).get();
  if (!existing.empty) return null;
  const entry: Omit<GymVisit, 'id'> = { date };
  const ref = await db.collection('users').doc(uid).collection('visits').add(entry);
  return ref.id;
};

export const removeGymVisit = async (uid: string, visitId: string): Promise<void> => {
  await db.collection('users').doc(uid).collection('visits').doc(visitId).delete();
};

export const getGymVisits = async (uid: string): Promise<GymVisit[]> => {
  const snapshot = await db.collection('users').doc(uid).collection('visits').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as GymVisit));
};
