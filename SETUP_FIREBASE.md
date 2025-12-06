# 🔥 Configuration Firebase - Guide étape par étape

## Étape 1 : Créer un compte Firebase

1. Allez sur : https://firebase.google.com
2. Cliquez sur "Get started" (ou "Commencer")
3. Connectez-vous avec votre compte Google
4. Cliquez sur "Go to console" (ou "Aller à la console")

## Étape 2 : Créer un projet

1. Cliquez sur "Add project" (Ajouter un projet)
2. Nom du projet : **"Transmosca Commercial"** (ou autre nom)
3. Acceptez les conditions
4. Désactivez Google Analytics (pas nécessaire pour vous)
5. Cliquez sur "Create project"

## Étape 3 : Configurer Firestore Database

1. Dans le menu gauche, cliquez sur **"Firestore Database"**
2. Cliquez sur **"Create database"**
3. Mode : Sélectionnez **"Start in test mode"** (pour commencer)
4. Location : Choisissez **"europe-west1"** (Belgique)
5. Cliquez sur **"Enable"**

## Étape 4 : Obtenir la configuration

1. En haut à gauche, cliquez sur l'icône ⚙️ (Settings) → "Project settings"
2. Scrollez jusqu'à "Your apps"
3. Cliquez sur l'icône **</>** (Web)
4. Nom de l'app : "Transmosca Web"
5. **NE PAS** cocher "Firebase Hosting"
6. Cliquez sur "Register app"

## Étape 5 : Copier la configuration

Vous verrez un bloc de code comme ceci :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

**COPIEZ tout ce bloc** et envoyez-le moi !

## Étape 6 : Configuration de sécurité (Important !)

1. Dans Firestore Database, cliquez sur l'onglet **"Rules"**
2. Remplacez le contenu par :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Cliquez sur **"Publish"**

⚠️ **Note** : Ces règles sont simples pour commencer. Plus tard, on pourra ajouter une authentification par email.

## ✅ Vous avez terminé !

Une fois que vous m'aurez envoyé votre `firebaseConfig`, je l'intégrerai automatiquement dans votre application.

## 🔒 Sécurité

- Votre repository GitHub sera **privé**, donc la config Firebase ne sera pas visible publiquement
- Seul vous avec le code PIN pourrez accéder à l'application
- Plus tard, on peut ajouter une authentification Firebase pour plus de sécurité
