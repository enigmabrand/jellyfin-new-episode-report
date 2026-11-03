const fetch = require("node-fetch");
const settings = require("./local.settings.json");
const jUrl = settings.jellyfin.apiUrl;
const jUserId = settings.jellyfin.userId;
const jKey = settings.jellyfin.apiKey;
const jTvId = settings.jellyfin.tvShowFolderId;
const { jellyFetchJson } = require("./jellyfetch.js");

/** Gets all TV shows from the Jellyfin API. */
async function getAllJellyfinShows() {
    const jsonData = await jellyFetchJson(`${jUrl}/users/${jUserId}/items/?fields=ProviderIds&parentid=${jTvId}`);
    return jsonData.Items;
}

/** Gets the newest episode info for a given show from the Jellyfin API. */
async function getNewestEpisode(showId) {
    let json = "";
    try {
        json = await jellyFetchJson(`${jUrl}/shows/${showId}/episodes?&userid=${jUserId}&fields=path`);
    } catch (err) {
        log(`ERR - ${err}`);
        errors.push(`${showId} threw an error when contacting the Jellyfin api.`);
        return;
    }

    const eps = json.Items
        .map(x => ({
            season: x.ParentIndexNumber,
            episode: x.IndexNumber,
            name: x.Name,
            path: x.Path,
            shorthand: `S${x.ParentIndexNumber?.toString().padStart(2, '0')}E${(x.IndexNumber?.toString().padStart(2, '0')) || "??"}`,
        })).sort((a, b) => {
            if (a.season < b.season) {
                return -1;
            } else if (a.season > b.season) {
                return 1;
            }

            return a.episode < b.episode
                ? -1
                : 1;
        });

    if (eps.length) {
        return eps[eps.length - 1];
    }

    return null;
}

module.exports = {
    getAllJellyfinShows,
    getNewestEpisode,
};