-- 使用するデータベースを明示
CREATE DATABASE IF NOT EXISTS `crypto-manager`;
USE `crypto-manager`;

-- テーブルの作成
-- currencies
CREATE TABLE `currencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'public name',
  `ticker_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'ticker code',
  `decimals` int unsigned DEFAULT '0' COMMENT 'scaling rate',
  `network` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'network(mainnet, testnet, etc.)',
  `network_type` enum('mainnet','testnet','devnet','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'mainnet' COMMENT 'mainnet/testnet/devnet分類',
  `chain_id` int unsigned DEFAULT NULL COMMENT 'chain id',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- addresses
CREATE TABLE `addresses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'address label',
  `currency_id` int DEFAULT NULL,
  `ticker_code` varchar(255) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'address',
  `type` int NOT NULL COMMENT '1: Wallet, 2: Validator, 3: Contract, 4: Treasury',
  `memo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT 'description',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'use / no use',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`),
  KEY `fk_addresses_currency` (`currency_id`),
  CONSTRAINT `fk_addresses_currency` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample data: currencies table

INSERT INTO `currencies` (`id`, `name`, `ticker_code`, `decimals`, `network`, `network_type`, `chain_id`, `created_at`, `updated_at`)
VALUES
	('1', 'Arbitrum', 'ARB', '18', 'Nova', 'mainnet', '42170', '2025-04-12 11:07:08', '2025-04-12 11:21:50'),
	('2', 'Arbitrum', 'ARB', '18', 'One', 'mainnet', '42161', '2025-04-12 11:08:12', '2025-04-12 11:21:50'),
	('3', 'Arbitrum', 'ARB', '18', 'Sepolia', 'testnet', '421614', '2025-04-12 11:09:47', '2025-04-12 13:08:13'),
	('4', 'NEAR Protocol', 'ETH', '18', 'Mainnet', 'mainnet', '1313161554', '2025-04-12 11:13:30', '2025-04-12 13:03:43'),
	('5', 'NEAR Protocol', 'ETH', '18', 'Testnet', 'testnet', '1313161555', '2025-04-12 11:14:20', '2025-04-12 13:03:51'),
	('6', 'Avalanche', 'AVAX', '18', 'Fuji', 'testnet', '43113', '2025-04-12 11:11:16', '2025-04-12 11:28:51'),
	('7', 'Avalanche', 'AVAX', '9', 'X-Chain', 'other', NULL, '2025-04-12 11:13:00', '2025-04-12 11:34:10'),
	('8', 'Avalanche', 'AVAX', '18', 'C-Chain', 'mainnet', '43114', '2025-04-12 11:31:32', '2025-04-12 11:34:11'),
	('9', 'Avalanche', 'AVAX', '18', 'P-Chain', 'mainnet', NULL, '2025-04-12 11:31:32', '2025-04-12 11:34:13'),
	('10', 'Avalanche', 'AVAX', '18', 'Fuji C-Chain', 'testnet', '43113', '2025-04-12 11:31:32', '2025-04-12 11:34:15'),
	('11', 'Avalanche', 'AVAX', '18', 'Fuji P-Chain', 'testnet', NULL, '2025-04-12 11:31:32', '2025-04-12 11:34:20'),
	('12', 'Ethereum', 'ETH', '18', 'Mainnet', 'mainnet', '1', '2025-04-12 11:05:57', '2025-04-12 11:35:20'),
	('13', 'Ethereum', 'ETH', '18', 'Hoodi', 'other', NULL, '2025-04-12 11:05:57', '2025-04-12 13:08:16'),
	('14', 'Ethereum', 'ETH', '18', 'Sepolia', 'testnet', '11155111', '2025-04-12 11:06:27', '2025-04-12 13:08:18'),
	('15', 'Ethereum', 'ETH', '18', 'Holesky', 'testnet', NULL, '2025-04-12 11:35:07', '2025-04-12 13:08:21'),
	('16', 'Bitcoin', 'BTC', '8', 'Mainnet', 'mainnet', NULL, '2025-04-12 11:11:00', '2025-04-12 11:32:04'),
	('17', 'Bitcoin', 'BTC', '8', 'Testnet', 'testnet', NULL, '2025-04-12 11:11:01', '2025-04-12 13:08:24'),
	('18', 'Cardano', 'ADA', '6', 'Mainnet', 'mainnet', NULL, '2025-04-12 10:52:31', '2025-04-12 11:32:24'),
	('19', 'Cardano', 'ADA', '6', 'PreProd', 'testnet', NULL, '2025-04-12 11:05:57', '2025-04-12 11:35:22'),
	('20', 'Cardano', 'ADA', '6', 'Preview', 'testnet', NULL, '2025-04-12 11:33:01', '2025-04-12 13:28:39'),
	('21', 'Toncoin', 'TON', '9', 'Mainnet', 'mainnet', NULL, '2025-04-12 11:12:00', '2025-04-12 11:33:12'),
	('22', 'Toncoin', 'TON', '9', 'Testnet', 'testnet', NULL, '2025-04-12 11:12:01', '2025-04-12 11:33:13'),
	('23', 'Optimism', 'OP', '18', 'Mainnet', 'mainnet', '10', '2025-04-12 11:12:15', '2025-04-12 11:21:50'),
	('24', 'Optimism', 'OP', '18', 'Sepolia', 'testnet', '11155420', '2025-04-12 11:12:16', '2025-04-12 11:28:51'),
	('25', 'Polkadot', 'DOT', '12', 'Mainnet', 'mainnet', NULL, '2025-04-12 11:10:08', '2025-04-12 11:21:50'),
	('26', 'Polkadot', 'WND', '14', 'Westend', 'testnet', NULL, '2025-04-12 11:10:44', '2025-04-12 11:28:51'),
	('27', 'Polygon', 'POL', '18', 'Mainnet', 'mainnet', '137', '2025-04-12 11:12:30', '2025-04-12 11:21:50'),
	('28', 'Polygon', 'MATIC', '18', 'Mumbai', 'mainnet', '80001', '2025-04-12 11:12:31', '2025-04-12 11:21:50'),
	('29', 'Solana', 'SOL', '9', 'Mainnet', 'mainnet', NULL, '2025-04-12 11:11:45', '2025-04-12 11:33:30'),
	('30', 'Solana', 'SOL', '9', 'Devnet', 'devnet', NULL, '2025-04-12 11:11:47', '2025-04-12 11:28:51'),
	('31', 'Solana', 'SOL', '9', 'Testnet', 'testnet', NULL, '2025-04-12 11:11:46', '2025-04-12 11:33:33'),
	('32', 'Stacks', 'STX', '6', 'Mainnet', 'mainnet', NULL, '2025-04-12 11:12:45', '2025-04-12 11:33:36'),
	('33', 'Stacks', 'STX', '6', 'Testnet', 'testnet', NULL, '2025-04-12 11:12:46', '2025-04-12 11:33:36'),
	('34', 'Tezos', 'XTZ', '6', 'Mainnet', 'mainnet', NULL, '2025-04-12 11:11:30', '2025-04-12 11:33:41'),
	('35', 'Tezos', 'XTZ', '6', 'Ghostnet', 'testnet', NULL, '2025-04-12 11:11:31', '2025-04-12 11:28:51'),
	('36', 'CosmosHub', 'ATOM', '6', 'Mainnet', 'mainnet', NULL, '2025-04-12 12:22:27', '2025-04-12 12:22:31'),
	('37', 'CosmosHub', 'ATOM', '6', 'Provider', 'testnet', NULL, '2025-04-12 12:22:59', '2025-04-12 12:23:02');


-- Insert sample data: addresses table
INSERT INTO `addresses` (`id`, `label`, `currency_id`, `ticker_code`, `address`, `type`, `memo`, `is_active`, `created_at`, `updated_at`)
VALUES
	('1', 'ADA Main Address', '6', 'ADA', 'addr1q9kexample123...', '1', 'Cardano mainnet', '0', '2025-04-12 05:28:40', '2025-04-12 14:07:08'),
	('2', 'ETH Main address', '12', 'ETH', '0x8Db91045B6C7438611B52B69db54281159f6E6f0', '1', 'On Metamask Wallet', '1', '2025-04-12 06:41:56', '2025-04-12 12:21:39'),
	('3', 'ARB Main Address', '2', 'ARB', '0x8Db91045B6C7438611B52B69db54281159f6E6f0', '1', 'On Metamask Wallet', '1', '2025-04-12 11:01:14', '2025-04-12 12:21:43'),
	('4', 'ATOM Main Address', '36', 'ATOM', 'cosmos1vz4f8prrh2vmtknzyh58yhqmgv43nlk0pdn6ef', '1', 'On Trust Wallet', '1', '2025-04-12 11:03:38', '2025-04-12 12:23:09'),
	('5', 'ARB Sub Address', '2', 'ARB', '0x51b8f945e5B3a26Bdfc8d029722F55793996273D', '1', 'Personal Account on Arbitrum Mainnet', '1', '2025-04-12 11:04:27', '2025-04-12 12:23:19'),
	('6', 'STX Main Address', '32', 'STX', 'SP14X2WHYE2WSYJCJCW5YN73EAVYXRTVH3R7016EK', '1', 'Personal Account on Stacks Mainnet', '1', '2025-04-12 12:12:34', '2025-04-12 12:23:26'),
	('7', 'BTC Main Address', '16', 'BTC', 'bc1qsvewllmwsphve0rzkk64xndef22st342afl8wa', '1', 'Personal Account on Bitcoin Mainnet', '1', '2025-04-12 12:13:09', '2025-04-12 12:23:40'),
	('8', 'BTC Test Address', '17', 'BTC', 'tb1qhsqrl56r4dssancyfgeuclyjd82grqqglj3kqe', '1', 'Personal Account on Bitcoin Testnet', '1', '2025-04-12 12:14:26', '2025-04-12 12:23:43'),
	('9', 'SOL Main Address', '29', 'SOL', 'EDuVpfE29Rb7S9q1bM5Db8WwtqMAPbZb8bqrfNcNt24c', '1', 'On Phantom Wallet', '1', '2025-04-12 12:15:17', '2025-04-12 12:23:53'),
	('10', 'SOL Test Address', '30', 'SOL', 'EOCKX4QU3MNWJFTMZBAQQF6E27GXSQSXJGMERHIOSBPIPNDGFVXG7POSOQ', '1', 'On Phantom Wallet(testnet)', '1', '2025-04-12 12:16:39', '2025-04-12 14:06:49');


