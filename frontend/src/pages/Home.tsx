import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h1>🚀 Crypto Address Manager</h1>
      <p>ブロックチェーンアドレスを一元管理できるアプリケーションです。</p>
      <ul>
        <li>複数のネットワークや通貨に対応</li>
        <li>アドレスの種類を分類（ウォレット・バリデータ・コントラクトなど）</li>
        <li>残高取得や履歴表示も可能（予定）</li>
      </ul>
      <p>左上のメニューから「Address List」に移動してください。</p>
    </div>
  );
};

export default Home;
