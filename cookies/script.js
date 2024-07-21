// scripts.js

// Fonction pour obtenir le cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Fonction pour définir un cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Fonction pour gérer l'acceptation des cookies
function handleCookies() {
    document.getElementById('cookie-banner').style.display = 'none';
    const now = new Date();
    const data = {
        ip: 'IP_FICTIVE', // Note: Il n'est pas possible d'obtenir l'IP du client via JavaScript côté client
        date: now.toISOString().split('T')[0],
        heure: now.toTimeString().split(' ')[0],
        format: window.innerWidth <= 768 ? 'mobile' : 'pc'
    };

    // Stockage des données dans un fichier info.json via fetch (note: cela ne fonctionne pas directement en front-end)
    fetch('info.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => console.log('Données envoyées:', data))
      .catch(error => console.error('Erreur:', error));
}

// Afficher la bannière si le cookie n'existe pas
if (!getCookie('cookiesAccepted')) {
    document.getElementById('cookie-banner').style.display = 'block';
    document.getElementById('accept-cookies').addEventListener('click', () => {
        setCookie('cookiesAccepted', 'true', 30);
        handleCookies();
    });
}
