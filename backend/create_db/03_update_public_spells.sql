-- Correction des sorts publics de base
UPDATE spells SET is_public = true, character_id = NULL WHERE name IN ('Fireball', 'Ice Bolt', 'Slash');
