-- =================================================
-- Création des tables pour le Mini RPG
-- =================================================
-- Supprime les tables si elles existent
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS spells CASCADE;
DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Création des tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    level INTEGER DEFAULT 1,
    experience INTEGER DEFAULT 0,
    health INTEGER DEFAULT 100,
    mana INTEGER DEFAULT 50,
    class VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spells (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    mana_cost INTEGER DEFAULT 10,
    effect VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    rarity VARCHAR(20) DEFAULT 'common',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);