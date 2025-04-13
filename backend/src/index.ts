import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import balanceRouter from './routes/balance';
import addressRouter from './routes/address';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/balance', balanceRouter);
// アドレス一覧
app.use('/api/addresses', addressRouter);


// Server起動
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
