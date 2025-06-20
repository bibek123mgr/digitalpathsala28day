import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';

import Login from './pages/auth/login';
import Dashboard from './pages/dashboard';
import Inventory from './pages/inventory';
import Users from './pages/users';
import Settings from './pages/setting';
import Suppliers from './pages/suppliers';
import Reports from './pages/reports';
import Products from './pages/products';
import Orders from './pages/orders';

import Layout from './components/layout/layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="products" element={<Products />} />
          {/* <Route path="orders" element={<Orders />} /> */}
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
