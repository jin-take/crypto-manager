import pool from '../db/mysql';
import { formatJSTDate } from '../utils/formatDate';

export async function getAllAddresses() {
  const [rows] = await pool.query<any[]>(`
    SELECT 
      a.id, 
      a.label, 
      a.address, 
      a.ticker_code as symbol, 
      c.network_type as network,
      a.type, 
      a.memo, 
      a.is_active, 
      a.created_at, 
      a.updated_at
    FROM addresses a
    JOIN currencies c ON a.currency_id = c.id
    ORDER BY a.id DESC
  `);

  return rows.map(addr => ({
    ...addr,
    created_at: formatJSTDate(addr.created_at),
    updated_at: formatJSTDate(addr.updated_at),
  }));
}

export async function getAddressesBySymbol() {
  const [rows] = await pool.query<any[]>(`
    SELECT DISTINCT 
      ticker_code as symbol 
    FROM currencies 
    ORDER BY 
      ticker_code ASC
  `);

  return rows.map(addr => ({
    ...addr,
    created_at: formatJSTDate(addr.created_at),
    updated_at: formatJSTDate(addr.updated_at),
  }));
}