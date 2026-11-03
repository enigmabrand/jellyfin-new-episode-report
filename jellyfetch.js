const fetch = require("node-fetch");
const settings = require("./local.settings.json");
const jKey = settings.jellyfin.apiKey;

async function jellyFetchJson(url) {
    const resp = await fetch(url, {
        headers: {
            Authorization: `MediaBrowser Token="${jKey}"`,
        },
    });

    if (!resp.ok) {
        throw new Error(`Jellyfin API error: ${resp.status} ${resp.statusText}`);
    }

    return await resp.json();
}

module.exports = {
    jellyFetchJson,
};