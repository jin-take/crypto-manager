import pool from '../db/mysql';

export async function createAddress(data: {
  label: string;
  address: string;
  symbol_id: number;
  network_id: number;
  type: number;
  memo?: string;
}) {
  const [result] = await pool.query(
    `INSERT INTO addresses (label, address, symbol_id, network_id, type, memo)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data.label, data.address, data.symbol_id, data.network_id, data.type, data.memo || null]
  );
  return result;
}
