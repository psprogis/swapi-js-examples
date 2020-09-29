// as of now it is hardcoded to return 5th element from url
// FIXME: add validation of the url and index, re-write more general solution
// url example: https://swapi.co/api/films/2/
function getIndexFromUrl(url) {
    return url.split('/')[5];
}

module.exports = {
    getIndexFromUrl,
};
