import authClient  from '../serviceClient/auth.Client.js';

export const login = async (form) => {
  const { email, password } = form;
  const res = await authClient.post('/api/auth/login', { email, password });
  return res;
};

export const register = async (form) => {
  const  { username, email, password, cpassword } = form;
  const res = await authClient.post('/api/auth/register', {
    username,
    email,
    password,
    cpassword,
  });
  return res.data;
};

const authService = {
  login,
  register,
};

export default authService;