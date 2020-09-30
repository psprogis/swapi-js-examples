const axios = require('axios');
const log = require('log4js').getLogger('swapi-api');

const API_URL = 'https://swapi.dev/api';

/**
 * get film info by index
 * @param {number} index
 */
async function getFilm({ index }) {
    return fetchItem({ collection: 'films', index });
}

/**
 * get profile info by index
 * @param {number} index
 */
async function getProfile({ index }) {
    return fetchItem({ collection: 'people', index });
}

async function getClimate(planetName) {
    const planet = await fetchItemByName({ collection: 'planets', name: planetName });
    return planet.climate;
}

async function getPilots(starshipName) {
    const starship = await fetchItemByName({ collection: 'starships', name: starshipName });
    const pilots = await axios.all(starship.pilots.map(pilot => axios.get(pilot)));

    return pilots.map(pilot => pilot.data.name);
}

async function fetchItemByName({ collection, name }) {
    const supportedCollections = ['planets', 'people', 'starships'];

    if (supportedCollections.indexOf(collection) === -1) {
        throw new Error(`swapi-api: Unsupported collection: ${collection}`);
    }

    const resp = await axios.get(`${API_URL}/${collection}`);
    if (resp.status !== 200) {
        throw new Error(`Cannot fetch ${collection} info, got unexpected status ${resp.status}`);
    }

    const items = resp.data.results.filter(item => item.name === name);

    if (items.length === 0) {
        throw new Error(`Collection: ${collection}, no items found by name: ${name}`);
    }

    if (items.length > 1) {
        console.warn(`Collection ${collection}, more than one item found, return the first one.`);
    }

    return items[0];
}

/**
 * main private function that hides/incapsulates all request logic
 * @param  {String} collection
 * @param  {number} index
 */
async function fetchItem({ collection, index }) {
    const supportedCollections = ['films', 'people', 'planets'];

    if (supportedCollections.indexOf(collection) === -1) {
        throw new Error(`swapi-api: Unsupported collection: ${collection}`);
    }

    log.info(`quering url: ${API_URL}/${collection}/${index}/`);
    const resp = await axios.get(`${API_URL}/${collection}/${index}/`);
    if (resp.status !== 200) {
        throw new Error(`swapi-api: Cannot fetch ${collection} info, got unexpected status ${resp.status}`);
    }

    return resp.data;
}

async function getUrl({ url }) {
    const response = await axios.get(url);

    return response.data;
}

module.exports = {
    getProfile,
    getFilm,
    getPilots,
    getClimate,
    getUrl,
};
