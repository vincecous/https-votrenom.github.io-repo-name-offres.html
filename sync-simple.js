// 📤 Système d'export/import pour synchroniser entre appareils
// Plus simple que Firebase - fonctionne immédiatement !

// Fonction pour exporter toutes les données
function exportAllData() {
  const data = {
    offres: JSON.parse(localStorage.getItem('tm_offres') || '[]'),
    contrats: JSON.parse(localStorage.getItem('tm_contrats') || '[]'),
    resultats: JSON.parse(localStorage.getItem('tm_resultats') || '[]'),
    agenda: JSON.parse(localStorage.getItem('tm_agenda_events') || '[]'),
    exportDate: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transmosca-data-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  alert('✅ Données exportées ! Transférez le fichier sur votre autre appareil.');
}

// Fonction pour importer les données
function importAllData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        // Fusionner avec les données existantes (pas écraser)
        if (data.offres) {
          const existing = JSON.parse(localStorage.getItem('tm_offres') || '[]');
          const merged = [...existing, ...data.offres.filter(o => !existing.find(e => e.id === o.id))];
          localStorage.setItem('tm_offres', JSON.stringify(merged));
        }
        
        if (data.contrats) {
          const existing = JSON.parse(localStorage.getItem('tm_contrats') || '[]');
          const merged = [...existing, ...data.contrats.filter(c => !existing.find(e => e.id === c.id))];
          localStorage.setItem('tm_contrats', JSON.stringify(merged));
        }
        
        if (data.resultats) {
          const existing = JSON.parse(localStorage.getItem('tm_resultats') || '[]');
          const merged = [...existing, ...data.resultats.filter(r => !existing.find(e => e.id === r.id))];
          localStorage.setItem('tm_resultats', JSON.stringify(merged));
        }
        
        if (data.agenda) {
          const existing = JSON.parse(localStorage.getItem('tm_agenda_events') || '[]');
          const merged = [...existing, ...data.agenda.filter(a => !existing.find(e => e.id === a.id))];
          localStorage.setItem('tm_agenda_events', JSON.stringify(merged));
        }
        
        alert('✅ Données importées avec succès ! Rechargez la page.');
        location.reload();
      } catch (error) {
        alert('❌ Erreur lors de l\'import : ' + error.message);
      }
    };
    reader.readAsText(file);
  };
  
  input.click();
}

// Ajouter les boutons dans la page
window.addEventListener('DOMContentLoaded', () => {
  // Ajouter boutons dans le footer si disponible
  const footer = document.querySelector('footer');
  if (footer && !document.getElementById('syncButtons')) {
    const syncDiv = document.createElement('div');
    syncDiv.id = 'syncButtons';
    syncDiv.style.cssText = 'margin-top: 1rem; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;';
    syncDiv.innerHTML = `
      <button onclick="exportAllData()" style="padding: 0.5rem 1rem; background: #1976d2; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
        📤 Exporter mes données
      </button>
      <button onclick="importAllData()" style="padding: 0.5rem 1rem; background: #0b6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
        📥 Importer des données
      </button>
    `;
    footer.appendChild(syncDiv);
  }
});

// Exposer les fonctions globalement
window.exportAllData = exportAllData;
window.importAllData = importAllData;

console.log('✅ Système d\'export/import chargé');
