import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    throw new Error('Unauthorized');
  }
}
