# Mini RPG - Scripts SQL

## Instructions

1. Se connecter à PostgreSQL :
```bash
psql -h 192.168.56.1 -U postgres -d mini_rpg

Exécuter les scripts dans l’ordre :

\i 01_create_tables.sql
\i 02_insert_data.sql

Vérifier les tables et les données :

\dt          -- liste les tables
SELECT * FROM users;
SELECT * FROM characters;
SELECT * FROM spells;
SELECT * FROM items;

Ce dossier permet de recréer la base complète de test pour le mini RPG.