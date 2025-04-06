-- db/init.sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- サンプルデータ
INSERT INTO users (name) VALUES
  ('Alice'),
  ('Bob'),
  ('Charlie');