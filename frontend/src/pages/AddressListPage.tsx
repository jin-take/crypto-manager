import React from 'react';
import { AddressList } from '../components/AddressList';

const AddressListPage: React.FC = () => {
  return (
    <div>
      <h1>📋 アドレス一覧</h1>
      <p>登録されているブロックチェーンアドレスのリストです。</p>
      <AddressList />
    </div>
  );
};

export default AddressListPage;
