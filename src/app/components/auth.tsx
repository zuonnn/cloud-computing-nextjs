import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const checkUserRole = (roleToCheck: string) => {
  const router = useRouter();
  try {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/');
      return false;
    }

    const decodedToken = jwt.decode(token) as { role: string } | null;
    const userRole = decodedToken?.role || '';

    return userRole === roleToCheck;
  } catch (error) {
    console.error('Error:', error);
    router.push('/');
    return false;
  }
};