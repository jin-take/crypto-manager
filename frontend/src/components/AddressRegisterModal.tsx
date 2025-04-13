import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/addressModal.css';
import { toast } from 'react-toastify';

type SymbolOption = {
  id: number;
  symbol: string;
};

type NetworkOption = {
  id: number;
  ticker_code: string;
  network: string;
  network_type: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: () => void;
};

export const AddressRegisterModal: React.FC<Props> = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [form, setForm] = useState({
    symbol: '',
    network: '',
    label: '',
    address: '',
    type: 1,
    memo: ''
  });

  const [symbols, setSymbols] = useState<SymbolOption[]>([]);
  const [networks, setNetworks] = useState<NetworkOption[]>([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/addresses/symbols')
      .then(res => setSymbols(res.data));
  }, []);

  useEffect(() => {
    if (form.symbol) {
      axios.get(`http://localhost:4000/api/addresses/networks/${form.symbol}`)
        .then(res => setNetworks(res.data));
      setForm(prev => ({ ...prev, network: '' })); // ネットワークを初期化
    }
  }, [form.symbol]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'type' ? Number(value) : value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:4000/api/addresses/address/register', form);
      toast.success('アドレスを登録しました');
      onRegisterSuccess();
    } catch (err) {
      console.error(err);
      toast.error('登録に失敗しました');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '60%', maxWidth: '800px' }}>
        <h2>新しいアドレスを登録</h2>
        <div className="modal-row">
          <label>Label</label>
          <input name="label" value={form.label} onChange={handleChange} />
        </div>
        <div className="modal-row">
          <label>Address</label>
          <input name="address" value={form.address} onChange={handleChange} />
        </div>
        <div className="modal-row">
          <label>Symbol</label>
          <select name="symbol" value={form.symbol} onChange={handleChange}>
            <option value="">-- Select Symbol --</option>
            {symbols.map(s => (
              <option key={s.id} value={s.symbol}>{s.symbol}</option>
            ))}
          </select>
        </div>
        <div className="modal-row">
          <label>Network</label>
          <select name="network" value={form.network} onChange={handleChange}>
            <option value="">-- Select Network --</option>
            {networks.map(n => (
              <option key={n.id} value={n.network}>
                {n.network} ({n.network_type})
              </option>
            ))}
          </select>
        </div>
        <div className="modal-row">
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value={1}>Wallet</option>
            <option value={2}>Validator</option>
            <option value={3}>Contract</option>
            <option value={4}>Treasury</option>
          </select>
        </div>
        <div className="modal-row">
          <label>Memo (optional)</label>
          <textarea name="memo" value={form.memo} onChange={handleChange} />
        </div>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>登録</button>
          <button onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};
