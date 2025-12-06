// 🔄 Synchronisation Firebase pour remplacer localStorage
// Ce fichier permet la synchronisation automatique entre tous vos appareils

// Wrapper pour remplacer localStorage par Firebase
const FirebaseStorage = {
  isInitialized: false,
  cache: {},

  async init() {
    if (this.isInitialized) return;
    console.log('🔥 Initialisation Firebase Storage...');
    this.isInitialized = true;
  },

  // Récupérer une donnée
  async getItem(key) {
    await this.init();
    
    // Si en cache, retourner immédiatement
    if (this.cache[key]) return this.cache[key];
    
    try {
      const doc = await db.collection('storage').doc(key).get();
      if (doc.exists) {
        const value = doc.data().value;
        this.cache[key] = value;
        return value;
      }
      return null;
    } catch (error) {
      console.error('Erreur Firebase getItem:', error);
      // Fallback vers localStorage
      return localStorage.getItem(key);
    }
  },

  // Sauvegarder une donnée
  async setItem(key, value) {
    await this.init();
    
    try {
      await db.collection('storage').doc(key).set({
        value: value,
        updatedAt: new Date().toISOString()
      });
      this.cache[key] = value;
      console.log('✅ Données sauvegardées:', key);
      
      // Aussi sauvegarder en local comme backup
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Erreur Firebase setItem:', error);
      // Fallback vers localStorage
      localStorage.setItem(key, value);
    }
  },

  // Écouter les changements en temps réel
  listen(key, callback) {
    return db.collection('storage').doc(key)
      .onSnapshot(doc => {
        if (doc.exists) {
          const value = doc.data().value;
          this.cache[key] = value;
          callback(value);
        }
      });
  }
};

// Remplacer localStorage globalement (pour compatibilité)
window.firebaseStorage = FirebaseStorage;

console.log('✅ Firebase Storage wrapper chargé');
