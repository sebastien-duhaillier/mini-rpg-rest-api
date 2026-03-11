# Mini RPG – Documentation de déploiement (CP8 TP DWWM)

## Présentation
Mini RPG est une application web dynamique développée seul dans le but d’étoffer mon portfolio. Elle comprend :
- Un back-end Node.js/Express connecté à une base PostgreSQL (hébergée sur Neon)
- Un front-end React (Vite) déployé sur Vercel
- Un déploiement cloud du back-end sur Railway

## Procédure de déploiement

### 1. Prérequis
- Compte Railway (pour le back-end)
- Compte Vercel (pour le front-end)
- Compte Neon (pour la base PostgreSQL)
- Accès au dépôt GitHub du projet

### 2. Déploiement de la base de données (Neon)
- Créer un projet PostgreSQL sur Neon
- Importer les scripts SQL (`backend/create_db/01_create_tables.sql`, `02_insert_data.sql`, `03_update_public_spells.sql`)
- Récupérer l’URL de connexion PostgreSQL (format : `postgres://...`)

### 3. Déploiement du back-end (Railway)
- Importer le projet depuis GitHub sur Railway
- Définir les variables d’environnement :
  - `DATABASE_URL` (URL Neon)
  - `JWT_SECRET` (secret fort pour le JWT)
- Configurer le port (8080) et la racine (`backend`)
- Déployer le service

### 4. Déploiement du front-end (Vercel)
- Importer le projet depuis GitHub sur Vercel
- Définir la variable d’environnement :
  - `VITE_BACKEND_URL` (URL Railway du back-end)
- Configurer la racine (`frontend`) et le dossier de build (`dist`)
- Déployer le site

### 5. Sécurisation et bonnes pratiques
- Utilisation de variables d’environnement pour tous les secrets et URLs sensibles
- Authentification JWT côté back-end
- Configuration CORS dynamique pour autoriser le front-end
- Veille sur les évolutions Railway, Vercel, Neon et les problématiques de sécurité (ex : gestion SSL, modes de connexion PostgreSQL, etc.)

### 6. Scripts et gestion des dépendances
- Installation des dépendances via `npm install` dans chaque dossier (`backend`, `frontend`)
- Scripts SQL pour la migration de la base
- Utilisation de Git pour la gestion de version

### 7. Documentation et reproductibilité
- Ce document permet à tout développeur de redéployer l’application de façon sécurisée et reproductible.

## Auteur
Développé seul par Sebastien DUHAILLIER dans le cadre de l’enrichissement du portfolio et de la validation de la CP8 du TP DWWM.

- Du 01/03/2026 au 11/03/2026
- https://github.com/sebastien-duhaillier/mini-rpg-rest-api
- front: https://mini-rpg-rest-api.vercel.app/
- Back: https://mini-rpg-rest-api-production.up.railway.app/
- Base de données PostgreSQL hébergée sur Neon (https://neon.tech)


