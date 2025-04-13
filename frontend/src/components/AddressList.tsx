import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Address } from '../types/address';
import { AddressModal } from './AddressModal';
import { AddressRegisterModal } from './AddressRegisterModal';
import '../styles/addressModal.css';

export const AddressList: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [filtered, setFiltered] = useState<Address[]>([]);
  const [selected, setSelected] = useState<Address | null>(null);

  const [symbols, setSymbols] = useState<string[]>([]);
  const [networks, setNetworks] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    symbol: '',
    network: '',
    useStatus: '',
    label: '',
    address: ''
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/api/addresses')
      .then(res => {
        setAddresses(res.data);
        setFiltered(res.data);

        const uniqueSymbols = Array.from(
          new Set(res.data.map((a: Address) => a.symbol).filter(Boolean))
        ) as string[];

        const uniqueNetworks = Array.from(
          new Set(res.data.map((a: Address) => a.network).filter(Boolean))
        ) as string[];

        setSymbols(uniqueSymbols);
        setNetworks(uniqueNetworks);
      })
      .catch(err => console.error('Failed to fetch addresses', err));
  }, []);

  useEffect(() => {
    let temp = [...addresses];
    if (filters.symbol) temp = temp.filter(a => a.symbol === filters.symbol);
    if (filters.network) temp = temp.filter(a => a.network === filters.network);
    if (filters.useStatus) temp = temp.filter(a => String(a.is_active) === filters.useStatus);
    if (filters.label) temp = temp.filter(a => a.label.toLowerCase().includes(filters.label.toLowerCase()));
    if (filters.address) temp = temp.filter(a => a.address.toLowerCase().includes(filters.address.toLowerCase()));
    setFiltered(temp);
  }, [filters, addresses]);

  const getUseStatusLabel = (status: boolean) => {
    if (status) return <span style={{ color: 'green' }}>active</span>;
    return <span style={{ color: 'red' }}>non-active</span>;
  };

  return (
    <div>
      <h1>アドレス一覧</h1>
      <button className="blue-button" onClick={() => setFilterOpen(!filterOpen)}>
        🔍 クイックフィルター
      </button>

      {filterOpen && (
        <div
          style={{
            backgroundColor: '#f0f8ff',
            border: '2px solid #007bff',
            borderRadius: '10px',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}
        >
          <div>
            <label style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Symbol</label>
            <select value={filters.symbol} onChange={e => setFilters({ ...filters, symbol: e.target.value })} style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}>
              <option value="">-- 全て --</option>
              {symbols.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Network</label>
            <select value={filters.network} onChange={e => setFilters({ ...filters, network: e.target.value })} style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}>
              <option value="">-- 全て --</option>
              {networks.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Use Status</label>
            <select value={filters.useStatus} onChange={e => setFilters({ ...filters, useStatus: e.target.value })} style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}>
              <option value="">-- 全て --</option>
              <option value="1">active</option>
              <option value="2">non-active</option>
              <option value="0">unknown</option>
            </select>
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <label style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Label</label>
            <input type="text" value={filters.label} onChange={e => setFilters({ ...filters, label: e.target.value })} style={{ width: '97%', padding: '1rem', fontSize: '1.1rem' }} />
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <label style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Address</label>
            <input type="text" value={filters.address} onChange={e => setFilters({ ...filters, address: e.target.value })} style={{ width: '97%', padding: '1rem', fontSize: '1.1rem' }} />
          </div>
        </div>
      )}

      <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
        <button className="blue-button" onClick={() => setRegisterOpen(true)}>
          ＋ アドレスを登録
        </button>
      </div>

      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Label</th>
            <th>Address</th>
            <th>Network</th>
            <th>Use Status</th>
            <th>詳細</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(addr => (
            <tr key={addr.id}>
              <td>{addr.symbol}</td>
              <td>{addr.label}</td>
              <td>{addr.address}</td>
              <td>{addr.network}</td>
              <td>{getUseStatusLabel(addr.is_active)}</td>
              <td>
                <button className="blue-button" onClick={() => setSelected(addr)}>詳細</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* モーダルの表示 */}
      {selected && (
        <AddressModal
          address={selected}
          onClose={() => setSelected(null)}
          onUpdate={() => {
            setSelected(null);
          }}
        />
      )}

      <AddressRegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onRegisterSuccess={() => {
          axios.get('http://localhost:4000/api/addresses')
            .then(res => {
              setAddresses(res.data);
              setFiltered(res.data);
            });
          setRegisterOpen(false);
        }}
      />
    </div>
  );
};