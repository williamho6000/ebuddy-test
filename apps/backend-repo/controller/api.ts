import { Request, Response } from 'express';
import { updateUserData, fetchUserData } from '../repository/userCollection';

export const updateUserController = async (req: Request, res: Response) => {
  const { userId, data } = req.body;
  try {
    const result = await updateUserData(userId, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user data' });
  }
};

export const fetchUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await fetchUserData(userId);
    console.log(user);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};