-- =====================================================
-- ORGANIZATION MANAGEMENT PANEL - COMPLETE SCHEMA
-- =====================================================

-- Tabela: Contas das organizações
CREATE TABLE IF NOT EXISTS `org_accounts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `org_name` VARCHAR(50) UNIQUE NOT NULL,
  `org_type` ENUM('job', 'gang') NOT NULL DEFAULT 'gang',
  `label` VARCHAR(100) NOT NULL,
  `balance` DECIMAL(15, 2) DEFAULT 0.00,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_org_name` (`org_name`),
  INDEX `idx_org_type` (`org_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: Configuração de farm das organizações
CREATE TABLE IF NOT EXISTS `org_farm_settings` (
  `org_name` VARCHAR(50) NOT NULL PRIMARY KEY,
  `enabled` TINYINT(1) NOT NULL DEFAULT 0,
  `daily_goal` INT NOT NULL DEFAULT 2000,
  `reward_type` ENUM('per_unit','fixed') NOT NULL DEFAULT 'per_unit',
  `reward_per_unit` DECIMAL(10,2) DEFAULT 0.00,
  `reward_fixed` DECIMAL(12,2) DEFAULT 0.00,
  `items_allowed` JSON NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: Transações bancárias
CREATE TABLE IF NOT EXISTS `org_transactions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `org_name` VARCHAR(50) NOT NULL,
  `citizenid` VARCHAR(50) NOT NULL,
  `transaction_type` ENUM('entrada', 'saque') NOT NULL,
  `description` VARCHAR(255) DEFAULT 'Sem descrição',
  `amount` DECIMAL(15, 2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_org_transactions` (`org_name`, `created_at` DESC),
  INDEX `idx_citizenid` (`citizenid`),
  INDEX `idx_type` (`transaction_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: Entregas de farm
CREATE TABLE IF NOT EXISTS `org_farm_deliveries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `org_name` VARCHAR(50) NOT NULL,
  `citizenid` VARCHAR(50) NOT NULL,
  `item` VARCHAR(50) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `delivered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_org_farm` (`org_name`, `delivered_at` DESC),
  INDEX `idx_citizenid_date` (`citizenid`, `delivered_at`),
  INDEX `idx_week` (`org_name`, YEARWEEK(`delivered_at`, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: Progresso diário de farm
CREATE TABLE IF NOT EXISTS `org_farm_progress` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `citizenid` VARCHAR(50) NOT NULL,
  `org_name` VARCHAR(50) NOT NULL,
  `date` DATE NOT NULL,
  `quantity` INT DEFAULT 0,
  `reward_claimed` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_daily_progress` (`citizenid`, `org_name`, `date`),
  INDEX `idx_progress` (`citizenid`, `org_name`, `date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: Tempo jogado na org
CREATE TABLE IF NOT EXISTS `org_playtime` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `citizenid` VARCHAR(50) NOT NULL,
  `org_name` VARCHAR(50) NOT NULL,
  `org_type` ENUM('job', 'gang') NOT NULL DEFAULT 'gang',
  `playtime` INT DEFAULT 0,
  `join_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_member` (`citizenid`, `org_name`),
  INDEX `idx_playtime` (`org_name`, `playtime` DESC),
  INDEX `idx_citizenid` (`citizenid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: Recrutamentos
CREATE TABLE IF NOT EXISTS `org_recruitments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `org_name` VARCHAR(50) NOT NULL,
  `recruiter_citizenid` VARCHAR(50) NOT NULL,
  `recruited_citizenid` VARCHAR(50) NOT NULL,
  `recruited_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_recruiter` (`recruiter_citizenid`),
  INDEX `idx_org_recruitments` (`org_name`, `recruited_at` DESC),
  INDEX `idx_recruited` (`recruited_citizenid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: Banimentos
CREATE TABLE IF NOT EXISTS `org_bans` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `org_name` VARCHAR(50) NOT NULL,
  `banned_by` VARCHAR(50) NOT NULL,
  `banned_citizenid` VARCHAR(50) NOT NULL,
  `reason` TEXT,
  `banned_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `unbanned_at` TIMESTAMP NULL,
  `unbanned_by` VARCHAR(50) NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  INDEX `idx_org_bans` (`org_name`, `is_active`),
  INDEX `idx_banned_citizen` (`banned_citizenid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: Avaliações
CREATE TABLE IF NOT EXISTS `org_ratings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `org_name` VARCHAR(50) NOT NULL,
  `rated_by` VARCHAR(50) NOT NULL,
  `rating` TINYINT CHECK (rating >= 1 AND rating <= 5),
  `comment` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_rating` (`org_name`, `rated_by`),
  INDEX `idx_org_ratings` (`org_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: Logs de ações
CREATE TABLE IF NOT EXISTS `org_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `org_name` VARCHAR(50) NOT NULL,
  `action_by` VARCHAR(50) NOT NULL,
  `action_type` VARCHAR(50) NOT NULL,
  `target_citizenid` VARCHAR(50),
  `details` JSON,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_org_logs` (`org_name`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exemplos iniciais (rode manualmente depois)
INSERT IGNORE INTO `org_accounts` (`org_name`, `org_type`, `label`, `balance`) VALUES
('bellagio', 'gang', 'Bellagio', 9601630.00),
('police', 'job', 'Policia Militar - RJ', 5000000.00),
('vanilla', 'gang', 'Vanilla', 1200000.00);
