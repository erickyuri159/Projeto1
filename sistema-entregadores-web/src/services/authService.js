import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';
const ADMIN_URL = 'http://localhost:3000/api/admin/';

const login = async (email, password) => {
  const response = await axios.post(API_URL + 'login', { email, password });
  if (response.data.token) {
    sessionStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const adminLogin = async (email, password) => {
  const response = await axios.post(ADMIN_URL + 'login', { email, password });
  if (response.data.token) {
    sessionStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const getUnapprovedCompanies = async () => {
  const token = JSON.parse(sessionStorage.getItem('user')).token;
  return await axios.get(ADMIN_URL + 'unapproved-companies', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const approveCompany = async (userId) => {
  const token = JSON.parse(sessionStorage.getItem('user')).token;
  return await axios.post(ADMIN_URL + 'approve-company', { userId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const authService = {
  login,
  adminLogin,
  getUnapprovedCompanies,
  approveCompany,
  getCurrentUser: () => JSON.parse(sessionStorage.getItem('user'))
};

export default authService;
