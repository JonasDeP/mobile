import { auth } from './firebase';
import { User } from '../types';

export const signIn = async (email: string, password: string): Promise<User> => {
  const result = await auth.signInWithEmailAndPassword(email, password);
  const user = result.user;
  return { uid: user?.uid ?? '', email: user?.email ?? null, displayName: user?.displayName ?? null };
};

export const signUp = async (email: string, password: string): Promise<User> => {
  const result = await auth.createUserWithEmailAndPassword(email, password);
  const user = result.user;
  return { uid: user?.uid ?? '', email: user?.email ?? null, displayName: user?.displayName ?? null };
};

export const signOut = async (): Promise<void> => {
  await auth.signOut();
};

export const onAuthStateChanged = (
  callback: (user: User | null) => void
): (() => void) => {
  return auth.onAuthStateChanged((fbUser) => {
    if (fbUser) {
      callback({ uid: fbUser.uid, email: fbUser.email, displayName: fbUser.displayName });
    } else {
      callback(null);
    }
  });
};
