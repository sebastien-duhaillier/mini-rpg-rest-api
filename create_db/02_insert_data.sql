-- =================================================
-- Insertion des données de test
-- =================================================
-- -----------------------------
-- 02_insert_data.sql (dev-friendly)
-- -----------------------------

-- On vide toutes les tables dans l'ordre inverse des dépendances pour éviter les erreurs FK
TRUNCATE TABLE spells, items, characters, users RESTART IDENTITY CASCADE;

-- Users
INSERT INTO users (username, password, email)
VALUES
('player1', 'password123', 'player1@mail.com'),
('player2', 'password456', 'player2@mail.com');

-- Characters
INSERT INTO characters (user_id, name, level, experience, health, mana, class)
VALUES
(1, 'Arthas', 5, 0, 100, 50, 'Warrior'),
(2, 'Merlin', 3, 0, 80, 120, 'Mage');

-- Spells
INSERT INTO spells (character_id, name, mana_cost, effect)
VALUES
(2, 'Fireball', 20, 'Deals 30 fire damage'),
(2, 'Ice Bolt', 15, 'Deals 20 ice damage'),
(1, 'Slash', 0, 'Deals 10 physical damage');

-- Items
INSERT INTO items (character_id, name)
VALUES
(1, 'Sword'),
(1, 'Shield'),
(2, 'Staff'),
(2, 'Robe');