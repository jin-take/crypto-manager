import express from 'express';
import pool from '../db/mysql';
import { getAllAddresses } from '../services/addressService';
import { createAddress } from '../services/addressCreateService';

const router = express.Router();

// 一覧取得（GET /api/addresses）
router.get('/', async (_req, res) => {
  try {
    const addresses = await getAllAddresses();
    res.json(addresses);
  } catch (err) {
    console.error('Failed to fetch addresses:', err);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

// 新規登録（POST /api/addresses）
router.post('/', async (req, res) => {
  try {
    const result = await createAddress(req.body);
    res.status(201).json({ message: 'Address created', result });
  } catch (err) {
    console.error('Failed to create address:', err);
    res.status(500).json({ error: 'Failed to create address' });
  }
});

// Symbol一覧取得（GET /api/addresses/symbols）
router.get('/symbols', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT ticker_code as symbol FROM currencies ORDER BY ticker_code ASC;');
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch symbols:', err);
    res.status(500).json({ error: 'Failed to fetch symbols' });
  }
});

// Network一覧取得（GET /api/addresses/networks）
router.get('/networks/:symbol', async (req, res) => {
  const { symbol } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT id, ticker_code, network, network_type FROM currencies WHERE ticker_code = ? GROUP BY id, network_type',
      [symbol]
    );

    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch network types:', err);
    res.status(500).json({ error: 'Failed to fetch network types' });
  }
});


// 編集（PUT /api/addresses/address/:id）
router.put('/address/:id', async (req, res): Promise<void> => {
  const { id } = req.params;
  const {
    symbol,
    network,
    label,
    address,
    type,
    memo,
    is_active,
  } = req.body;

  if (!symbol || !network || !label || !address || !type) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const sql = `
      UPDATE addresses
      SET symbol = ?, network = ?, label = ?, address = ?, type = ?, memo = ?, is_active = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const params = [symbol, network, label, address, type, memo ?? null, is_active ?? 1, id];
    await pool.execute(sql, params);

    res.status(200).json({ message: 'Address updated' });
  } catch (err) {
    console.error('Failed to update address:', err);
    res.status(500).json({ error: 'Failed to update address' });
  }
});


export default router;
