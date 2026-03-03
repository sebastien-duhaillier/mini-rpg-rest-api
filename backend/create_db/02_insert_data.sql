-- =================================================
-- Insertion des données de test
-- =================================================
-- -----------------------------
-- 02_insert_data.sql (dev-friendly)
-- -----------------------------

-- On vide toutes les tables dans l'ordre inverse des dépendances pour éviter les erreurs FK
TRUNCATE TABLE spells, items, characters, users RESTART IDENTITY CASCADE;

-- Users
INSERT INTO users (username, password, email, role)
VALUES
('superadmin', '$2b$10$VjHsbaK6z35ZOgLnptIzjOfNlztmXlC.wozr3tabdFB8JssQc3g.a', 'admin@mail.com', 'admin'),
('player1', 'password123', 'player1@mail.com', 'user'),
('player2', 'password456', 'player2@mail.com', 'user');

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

-- Items publics de base (disponibles pour tous, non liés à un personnage)
INSERT INTO items (character_id, name, is_public)
VALUES
(NULL, 'Sword', true),
(NULL, 'Shield', true),
(NULL, 'Staff', true),
(NULL, 'Robe', true);

-- Sorts publics de base (disponibles pour tous, non liés à un personnage)
INSERT INTO spells (character_id, name, mana_cost, effect, is_public)
VALUES
(NULL, 'Fireball', 20, 'Deals 30 fire damage', true),
(NULL, 'Ice Bolt', 15, 'Deals 20 ice damage', true),
(NULL, 'Slash', 0, 'Deals 10 physical damage', true);