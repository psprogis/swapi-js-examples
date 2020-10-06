// url example: https://swapi.dev/api/films/2/
function getIndexFromSwapiUrl(url) {
    // eslint-disable-next-line
    const swapiUrlRegex = /^https?:\/\/[^\/]+\/[^\/]+\/[^\/]+\/\d\//;

    if (!swapiUrlRegex.test(url)) {
        throw new Error('Invalid url, cannot parse index');
    }

    return url.split('/')[5];
}

module.exports = {
    getIndexFromSwapiUrl,
};
