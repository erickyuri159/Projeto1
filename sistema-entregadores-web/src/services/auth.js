import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

const login = async (email, password) => {
  const response = await axios.post(API_URL + 'login', { email, password });
  if (response.data.token) {
    sessionStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (name, email, password) => {
  const response = await axios.post(API_URL + 'register', { name, email, password });
  return response.data;
};

const logout = () => {
  sessionStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem('user'));
};

const getToken = () => {
  const user = getCurrentUser();
  return user ? user.token : null;
};

const getRole = () => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

const setCurrentUser = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};
const getAdminOverview = () => { 
  const overview = {
    companyCount: 10,
    totalEarnings: 15,
  };

  return overview;
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  getToken,
  getRole,
  setCurrentUser,
  getAdminOverview,
};

export default authService;