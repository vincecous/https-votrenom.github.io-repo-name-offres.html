// 🔥 Configuration Firebase - Programme Commercial Vincent
// Configuration récupérée depuis Firebase Console

const firebaseConfig = {
  apiKey: "AIzaSyDm-80qKZrcMzHOaohy508ENkjJLL9kehw",
  authDomain: "programme-commercial-vincent.firebaseapp.com",
  projectId: "programme-commercial-vincent",
  storageBucket: "programme-commercial-vincent.firebasestorage.app",
  messagingSenderId: "142339154872",
  appId: "1:142339154872:web:2395c3b8af188a0815254d"
};

// ====== NE PAS MODIFIER EN-DESSOUS ======

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Helper pour gérer la synchronisation
const FirebaseSync = {
  // Collections Firestore
  collections: {
    offers: 'tm_offres',
    contracts: 'tm_contrats',
    results: 'tm_resultats',
    events: 'tm_agenda_events',
    clients: 'tm_clients'
  },

  // Sauvegarder des données
  async save(collectionName, data) {
    try {
      if (data.id) {
        // Mise à jour
        await db.collection(collectionName).doc(data.id).set(data);
      } else {
        // Nouveau document
        data.id = this.generateId();
        await db.collection(collectionName).doc(data.id).set(data);
      }
      console.log('✅ Données sauvegardées sur Firebase:', collectionName);
      return data;
    } catch (error) {
      console.error('❌ Erreur Firebase save:', error);
      throw error;
    }
  },

  // Récupérer toutes les données d'une collection
  async getAll(collectionName) {
    try {
      const snapshot = await db.collection(collectionName).get();
      const data = [];
      snapshot.forEach(doc => {
        data.push(doc.data());
      });
      console.log(`✅ ${data.length} éléments récupérés de ${collectionName}`);
      return data;
    } catch (error) {
      console.error('❌ Erreur Firebase getAll:', error);
      return [];
    }
  },

  // Récupérer un document spécifique
  async getOne(collectionName, id) {
    try {
      const doc = await db.collection(collectionName).doc(id).get();
      if (doc.exists) {
        return doc.data();
      }
      return null;
    } catch (error) {
      console.error('❌ Erreur Firebase getOne:', error);
      return null;
    }
  },

  // Supprimer un document
  async delete(collectionName, id) {
    try {
      await db.collection(collectionName).doc(id).delete();
      console.log('✅ Document supprimé de Firebase:', id);
    } catch (error) {
      console.error('❌ Erreur Firebase delete:', error);
      throw error;
    }
  },

  // Écouter les changements en temps réel
  listen(collectionName, callback) {
    return db.collection(collectionName).onSnapshot(snapshot => {
      const data = [];
      snapshot.forEach(doc => {
        data.push(doc.data());
      });
      callback(data);
    });
  },

  // Générer un ID unique
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  // Migration depuis localStorage
  async migrateFromLocalStorage() {
    console.log('🔄 Début de la migration localStorage → Firebase...');
    
    const migrations = [
      { key: 'tm_offres', collection: this.collections.offers },
      { key: 'tm_contrats', collection: this.collections.contracts },
      { key: 'tm_resultats', collection: this.collections.results },
      { key: 'tm_agenda_events', collection: this.collections.events }
    ];

    for (const { key, collection } of migrations) {
      try {
        const localData = JSON.parse(localStorage.getItem(key) || '[]');
        if (localData.length > 0) {
          console.log(`📦 Migration de ${localData.length} éléments de ${key}...`);
          for (const item of localData) {
            if (!item.id) item.id = this.generateId();
            await this.save(collection, item);
          }
          console.log(`✅ ${key} migré avec succès !`);
        }
      } catch (error) {
        console.error(`❌ Erreur migration ${key}:`, error);
      }
    }
    
    console.log('✅ Migration terminée !');
  }
};

// Exposer globalement
window.FirebaseSync = FirebaseSync;
