import { fetch } from './fetch'

const apiUrl = '/users';

export const fetchUserData = async (userId: string) => {
  const response = await fetch.get(`${apiUrl}/fetch-user-data/${userId}`);
  return response;
};

export const updateUserData = async (userId: string, data: any) => {
  const response = await fetch.put(`${apiUrl}/update-user-data`, { userId, data });
  return response;
};