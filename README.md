# Plant Garden

![Made with :](https://img.shields.io/badge/Made%20with%20:-brightgreen?style=flat)
![AdonisJS](https://img.shields.io/badge/AdonisJS-blue?style=flat&logo=adonisjs&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-blue?style=flat&logo=vue.js)
![Inertia.js](https://img.shields.io/badge/Inertia.js-blue?style=flat&logo=inertia&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-blue?style=flat&logo=mysql&logoColor=white)

En cours de développement ...

Plant Garden est une application web qui vise à simplifier la gestion des semis et des plantations dans son jardin. Elle permet de positionner les plantes dans les différents emplacements de son jardin, ainsi que de suivre les dates de semis et de plantations de toutes ces plantes.

Cette application est créée dans le but de découvrir le framework AdonisJS.

## Fonctionnalités

- Gestion des jardins des utilisateurs : Plant Garden permet aux utilisateurs de se connecter pour accéder à leurs jardins virtuels.

- Gestion de l'emplacement des semis et plantations : L'une des fonctionnalités clés de Plant Garden est la possibilité d'attribuer des emplacements spécifiques à chaque semis et plantations dans les différents jardins de l'utilisateur.

- Calendrier interactif : Plant Garden offre un calendrier qui permet aux utilisateurs de visualiser les dates de semis, de plantation et de récolte pour chaque plante.

## Technologies utilisées

- AdonisJS pour le backend
- Vue.js pour le frontend
- Inertia.js
- MySQL pour la base de données

## Installation

Pour installer Plant Garden localement, suivez les étapes ci-dessous :

1. Clonage du dépôt GitHub

   ```bash
   git clone https://github.com/aleowyne/plant-garden.git
   ```

2. Installation des dépendances

   ```bash
   cd plant-garden
   npm install
   ```

3. Configuration des variables d'environnement

   Copiez le fichier `.env.example` en tant que `.env` dans le dossier de l'application et mettez à jour les variables d'environnement appropriées.

4. Création des tables dans la base de données

   ```bash
   node ace migration:run
   ```

5. Lancement du serveur
   ```bash
   npm run dev
   ```

## Licence

Le projet est sous licence [MIT](https://github.com/Aleowyne/plant-garden/blob/main/LICENSE.md).
