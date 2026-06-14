import authClient  from '../serviceClient/auth.Client.js';

export const login = async ({ email, password }) => {
  const response = await authClient.post('/auth/login', { email, password });
  return response.data;
};

export const register = async ({ username, email, password, cpassword }) => {
  const response = await authClient.post('/auth/register', {
    username,
    email,
    password,
    cpassword,
  });
  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;