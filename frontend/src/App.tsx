// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import AddressListPage from './pages/AddressListPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/address-list" element={<AddressListPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  </Router>
);

export default App;
