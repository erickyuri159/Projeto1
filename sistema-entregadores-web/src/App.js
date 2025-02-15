import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import HomeLogin from './pages/HomeLogin';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Orders from './pages/Orders';
import OrdersMade from './pages/OrdersMade';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PendingOrders from './pages/PendingOrders';
import AdminLogin from './pages/AdminLogin';
import AdminOverview from './pages/AdminOverview';
import AdminCreateCompany from './pages/AdminCreateCompany';
import AdminAddCredit from './pages/AdminAddCredit';
import AdminApproveCompany from './pages/AdminApproveCompany';
import RoleSelection from './pages/RoleSelection'; // Adicione o componente RoleSelection
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div id="root">
        <Header />
        <div className="main-content">
          <Routes>
            {/* Rotas privadas que exigem autenticação */}
            <Route path="/" element={<PrivateRoute element={Home} />} />
            <Route path="/Register" element={<PrivateRoute element={Register} />} />
            <Route path="/Orders" element={<PrivateRoute element={Orders} />} />
            <Route path="/orders-made" element={<PrivateRoute element={OrdersMade} />} />
            <Route path="/pending-orders" element={<PrivateRoute element={PendingOrders} />} /> 
            <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />

            {/* Rotas públicas para login e HomeLogin */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Homelogin" element={<HomeLogin />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/Contact" element={<Contact />} /> {/* Rota pública para Fale Conosco */}
            <Route path="/Register" element={<Register />} /> {/* Adicionando a rota de registro */}

            {/* Rotas para área administrativa */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<PrivateRoute role="admin" />}>
              <Route path="/admin/overview" element={<AdminOverview />} />
              <Route path="/admin/create-company" element={<AdminCreateCompany />} />
              <Route path="/admin/add-credit" element={<AdminAddCredit />} />
              <Route path="/admin/approve-company" element={<AdminApproveCompany />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
