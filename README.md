

# Application de Publications

Une application full-stack permettant aux utilisateurs de créer, lire, modifier et supprimer des publications. Construite avec Node.js, Express, MongoDB, et React.

## 🚀 Architecture

L'application est composée de trois services principaux :
- **Gateway** (Port 3001) : Point d'entrée API
- **User Service** (Port 4001) : Gestion des utilisateurs et authentification
- **Publication Service** (Port 4002) : Gestion des publications
- **Frontend** (Port 3000) : Interface utilisateur React

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MongoDB
- npm ou yarn

## ⚙️ Configuration

1. **Configuration des variables d'environnement**

Créez un fichier `.env` à la racine du dossier `back` :
```env
# MongoDB Connection Strings
USER_MONGODB_URI=mongodb://127.0.0.1:27017/user
PUBLICATION_MONGODB_URI=mongodb://127.0.0.1:27017/publication

# API Gateway Configuration
GATEWAY_PORT=3001

# Service Ports
USER_SERVICE_PORT=4001
PUBLICATION_SERVICE_PORT=4002

# JWT Configuration
JWT_SECRET=votre_secret_tres_securise
```

## 🚀 Installation

1. **Cloner le repository**
```bash
git clone [url-du-repo]
cd [nom-du-repo]
```

2. **Installer les dépendances**
```bash
# Gateway
cd back/gateway
npm install

# User Service
cd ../user
npm install

# Publication Service
cd ../publication
npm install

# Frontend
cd ../../front
npm install
```

3. **Démarrer MongoDB**
```bash
mongod
```

4. **Démarrer les services (dans des terminaux séparés)**
```bash
# Gateway
cd back/gateway
npm start

# User Service
cd back/user
npm start

# Publication Service
cd back/publication
npm start

# Frontend
cd front
npm start
```

## 🌐 Utilisation

1. Accédez à `http://localhost:3000`
2. Créez un compte via "Inscription"
3. Connectez-vous
4. Commencez à créer des publications !

## 🔒 Fonctionnalités de Sécurité

- Authentification JWT
- Protection des routes sensibles
- Hachage des mots de passe
- Validation des données

## 📱 Fonctionnalités Principales

### Utilisateurs
- Inscription
- Connexion
- Déconnexion

### Publications
- Création de publications
- Lecture de toutes les publications
- Modification de ses propres publications
- Suppression de ses propres publications

## 🛠️ Technologies Utilisées

### Backend
- Node.js
- Express
- MongoDB
- JWT
- bcrypt

### Frontend
- React
- Material-UI
- Axios
- React Router

## 🔍 Structure du Projet
```
.
├── back/
│   ├── gateway/         # API Gateway
│   ├── user/           # Service utilisateur
│   ├── publication/    # Service publication
│   └── .env           # Variables d'environnement
├── front/
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

MIT License
```

Ce README :
1. Explique l'architecture de l'application
2. Détaille la configuration nécessaire
3. Fournit les instructions d'installation
4. Décrit les fonctionnalités
5. Liste les technologies utilisées
6. Donne la structure du projet
7. Explique comment contribuer

Voulez-vous que je détaille davantage certaines parties ?
