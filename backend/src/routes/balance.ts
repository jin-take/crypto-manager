import express from 'express';
import axios from 'axios';
import pool from '../db/mysql';

const router = express.Router();

router.get('/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const response = await axios.get(`https://rpc.coinsdo.net/ada/address/${address}`);
    const balance = response.data.data.amount;

    await pool.query('INSERT INTO balances (address, balance) VALUES (?, ?) ON DUPLICATE KEY UPDATE balance=?', [
      address,
      balance,
      balance,
    ]);

    res.json({ balance });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving balance');
  }
});

export default router;
