const settings = require("./local.settings.json");
const { jellyFetchJson } = require("./jellyfetch.js");

const jUrl = settings.jellyfin.apiUrl;
const jUserId = settings.jellyfin.userId;

async function getLibraries() {
    const data = await jellyFetchJson(`${jUrl}/users/${jUserId}/items`);

    for (let i = 0; i < data.Items.length; i++) {
        const item = data.Items[i];
        console.log(`"${item.Name}" (${item.CollectionType}): ${item.Id}`)
    }
}

getLibraries();