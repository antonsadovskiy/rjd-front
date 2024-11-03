import { jwtDecode } from 'jwt-decode';

export const defineIsAdmin = (token: string) => {
  const tokenData = jwtDecode(token);
  if ('roles' in tokenData && Array.isArray(tokenData.roles)) {
    return tokenData.roles.includes(1);
  }

  return false;
};
