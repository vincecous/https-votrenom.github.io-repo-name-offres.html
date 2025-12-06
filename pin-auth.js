// 🔒 Système d'authentification PIN pour toutes les pages
// Code PIN configuré : 4554

const CORRECT_PIN = "4554";
const PIN_SESSION_KEY = "tm_pin_session";

function checkPin() {
  const input = document.getElementById('pinInput');
  const error = document.getElementById('pinError');
  const enteredPin = input.value;
  
  if (enteredPin === CORRECT_PIN) {
    // PIN correct
    sessionStorage.setItem(PIN_SESSION_KEY, 'authenticated');
    document.getElementById('pinScreen').classList.add('hidden');
    document.getElementById('appContent').classList.remove('locked');
    error.textContent = '';
  } else {
    // PIN incorrect
    error.textContent = '❌ Code PIN incorrect';
    input.value = '';
    input.focus();
  }
}

// Vérifier si déjà authentifié dans cette session
window.addEventListener('DOMContentLoaded', () => {
  const pinInput = document.getElementById('pinInput');
  
  if (sessionStorage.getItem(PIN_SESSION_KEY) === 'authenticated') {
    document.getElementById('pinScreen').classList.add('hidden');
    document.getElementById('appContent').classList.remove('locked');
  } else {
    if (pinInput) pinInput.focus();
  }
  
  // Permettre la validation avec Enter
  if (pinInput) {
    pinInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkPin();
    });
  }
});
