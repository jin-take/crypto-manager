import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Address } from '../types/address';
import '../styles/addressModal.css';

interface Props {
  address: Address;
  onClose: () => void;
  onUpdate: () => void;
}

type NetworkOption = {
  id: number;
  ticker_code: string;
  network: string;
  network_type: string;
};

export const AddressModal: React.FC<Props> = ({ address, onClose, onUpdate }) => {
  const [form, setForm] = useState<Address>(address);
  const [editMode, setEditMode] = useState(false);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [networks, setNetworks] = useState<NetworkOption[]>([]);

  useEffect(() => {
    setForm(address);
  }, [address]);

  useEffect(() => {
    fetch('http://localhost:4000/api/addresses/symbols')
      .then(res => res.json())
      .then(data => {
        const symbolList = data.map((s: any) => s.symbol);
        setSymbols(symbolList);

        // form.symbol が一致していなければリセット
        setForm(prev => ({
          ...prev,
          symbol: symbolList.includes(prev.symbol) ? prev.symbol : ''
        }));
      });
  }, []);

  if (!address || !address.id) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!window.confirm('本当にこの内容で更新しますか？')) return;
    try {
      await fetch(`http://localhost:4000/api/addresses/address/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      onUpdate();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>アドレス詳細</h2>

        <div className="modal-row">
          <label>Label</label>
          {!editMode ? (
            <div>{form.label}</div>
          ) : (
            <input name="label" value={form.label} onChange={handleChange} />
          )}
        </div>

        <div className="modal-row">
          <label>Address</label>
          {!editMode ? (
            <div>{form.address}</div>
          ) : (
            <input name="address" value={form.address} onChange={handleChange} />
          )}
        </div>

        <div className="modal-row">
          <label>Symbol</label>
          {!editMode ? (
            <div>{form.symbol}</div>
          ) : (
            <input name="symbol" value={form.symbol} onChange={handleChange} />
          )}
        </div>

        <div className="modal-row">
          <label>Network</label>
          {!editMode ? (
            <div>{form.network}</div>
          ) : (
            <input name="network" value={form.network} onChange={handleChange} />
          )}
        </div>

        <div className="modal-row">
          <label>Type</label>
          {!editMode ? (
            <div>{form.type}</div>
          ) : (
            <input name="type" value={form.type} onChange={handleChange} />
          )}
        </div>

        <div className="modal-row">
          <label>Memo(option)</label>
          {!editMode ? (
            <div>{form.memo || '-'}</div>
          ) : (
            <textarea name="memo" value={form.memo || ''} onChange={handleChange} />
          )}
        </div>

        <div className="modal-buttons">
          {!editMode ? (
            <button onClick={() => setEditMode(true)}>編集する</button>
          ) : (
            <>
              <button onClick={handleSubmit}>更新</button>
              <button onClick={() => setEditMode(false)}>キャンセル</button>
            </>
          )}
          <button onClick={onClose}>閉じる</button>
        </div>
      </div>
    </div>

  );
};
