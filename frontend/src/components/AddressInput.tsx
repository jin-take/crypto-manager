import React from 'react';

export const AddressInput = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
  <input value={value} onChange={e => onChange(e.target.value)} placeholder="アドレス入力" />
);