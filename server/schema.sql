
CREATE TABLE IF NOT EXISTS instruments (
  id VARCHAR(100) PRIMARY KEY,           -- slug, e.g. "supra-55" (used in /instruments/:id URLs)
  name VARCHAR(255) NOT NULL,
  full_name VARCHAR(500) NOT NULL,
  category VARCHAR(255) NOT NULL,
  model VARCHAR(500) NOT NULL,
  show_in_status BOOLEAN NOT NULL DEFAULT TRUE,
  status VARCHAR(100) NOT NULL DEFAULT 'Operational',
  usage_academic VARCHAR(255) DEFAULT '',
  usage_industrial VARCHAR(255) DEFAULT '',
  usage_unit VARCHAR(255) DEFAULT '',
  features JSON NOT NULL,                -- array of strings
  applications JSON NOT NULL,            -- array of strings
  handled_by VARCHAR(255) DEFAULT '',
  email VARCHAR(255) DEFAULT '',
  location VARCHAR(255) DEFAULT '',
  images JSON NOT NULL,                  -- array of image URL strings
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS category_descriptions (
  category VARCHAR(255) PRIMARY KEY,
  description VARCHAR(500) DEFAULT ''
);

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_label VARCHAR(255) NOT NULL,      -- kept as free text, e.g. "18-19 June 2026"
  title VARCHAR(500) NOT NULL,
  image VARCHAR(1000) DEFAULT '',
  full_description TEXT,
  venue VARCHAR(500) DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS outreach (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_label VARCHAR(255) NOT NULL,      -- kept as free text, e.g. "18-19 June 2026"
  title VARCHAR(500) NOT NULL,
  image VARCHAR(1000) DEFAULT '',
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
