const settings = require("./local.settings.json");
const { jellyFetchJson } = require("./jellyfetch.js");

const jUrl = settings.jellyfin.apiUrl;
const jKey = settings.jellyfin.apiKey;

async function getUsers() {
    const data = await jellyFetchJson(`${jUrl}/users?api_key=${jKey}`);

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        console.log(`"${item.Name}": ${item.Id}`)
    }
}

getUsers();