// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rate from './component/Rates';
import Header from './component/Header';
import Chart from './component/Chart';
import './App.css'; // 新しいCSSファイルをインポート

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="header-margin"> {/* ヘッダー分のスペースを確保 */}
          <Routes>
            <Route path="/rates" element={<Rate />} />
            <Route path="/" element={<Chart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
