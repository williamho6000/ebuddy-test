import { db } from '../config/firebaseConfig';
import { User } from '../entities/user';

const USERS_COLLECTION = 'users';

export const updateUserData = async (userId: string, data: Partial<User>) => {
  const userRef = db.collection(USERS_COLLECTION).doc(userId);
  await userRef.set(data, { merge: true });
  return { success: true };
};

export const fetchUserData = async (userId: string): Promise<User | null> => {
  const userDoc = await db.collection(USERS_COLLECTION).doc(userId).get();
  return userDoc.exists ? (userDoc.data() as User) : null;
};