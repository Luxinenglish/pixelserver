const fs = require('fs').promises;
const fetch = require('node-fetch');

// Fonction pour lire la configuration depuis le fichier JSON
async function readConfig() {
    const data = await fs.readFile('config.json', 'utf8');
    return JSON.parse(data);
}

// Fonction pour obtenir le ticket d'authentification
async function getAuthTicket(config) {
    const response = await fetch(`${config.proxmoxHost}/api2/json/access/ticket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent(config.username)}&password=${encodeURIComponent(config.password)}`
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de la connexion: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
}

// Fonction pour obtenir les informations des nœuds
async function getNodes(config, authData) {
    const response = await fetch(`${config.proxmoxHost}/api2/json/nodes`, {
        method: 'GET',
        headers: {
            'Authorization': `PVEAPIToken=${authData.ticket}`,
            'Cookie': `PVEAuthCookie=${authData.ticket}`
        }
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des nœuds: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
}

// Fonction principale pour gérer la connexion et la récupération des données
async function main() {
    try {
        const config = await readConfig();
        console.log('Configuration chargée:', config);

        const authData = await getAuthTicket(config);
        console.log('Authentification réussie:', authData);

        const nodes = await getNodes(config, authData);
        console.log('Nœuds:', nodes);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Exécution du script principal
main();

