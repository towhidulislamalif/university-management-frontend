import { jwtDecode } from 'jwt-decode';

export const tokenVerify = (token: string) => {
  return jwtDecode(token);
};
