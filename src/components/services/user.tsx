import { User } from "../types/User";
import usersFromServer from '../api/users.json';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId);
};