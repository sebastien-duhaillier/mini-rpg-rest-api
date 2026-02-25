# Mini RPG - Scripts SQL

## 🚀 Méthode recommandée

Depuis la racine du projet, exécuter :

```bash
npm run db:dev
```

Cette commande exécute automatiquement tous les fichiers SQL dans le bon ordre et utilise les variables d'environnement du fichier `.env`.

## 📋 Méthode alternative (script direct)

Depuis la racine du projet :

```bash
node run_sql.js
```

## 📋 Méthode manuelle

1. Se connecter à PostgreSQL :

```bash
psql -h 192.168.56.1 -U postgres -d mini_rpg
```

2. Exécuter les scripts dans l'ordre :

```sql
\i 01_create_tables.sql
\i 02_insert_data.sql
```

3. Vérifier les tables et les données :

```sql
\dt          -- liste les tables
SELECT * FROM users;
SELECT * FROM characters;
SELECT * FROM spells;
SELECT * FROM items;
```

Ce dossier permet de recréer la base complète de test pour le mini RPG.