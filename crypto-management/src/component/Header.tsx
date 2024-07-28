import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // スタイリング用のCSSファイルをインポート

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        Crypto Rates
      </Link>
    </header>
  );
};

export default Header;
