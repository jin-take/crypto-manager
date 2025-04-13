import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'; // 任意でスタイル分離も可能

export const Header: React.FC = () => (
  <header style={{
    backgroundColor: '#333',
    color: '#fff',
    padding: '1rem'
  }}>
    <nav>
      <Link to="/" style={{ marginRight: '1rem', color: '#fff', textDecoration: 'none' }}>🏠 Home</Link>
      <Link to="/address-list" style={{ color: '#fff', textDecoration: 'none' }}>📋 Address List</Link>
    </nav>
  </header>
);
