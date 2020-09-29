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

/**
 * main private function that hides/incapsulates all request logic
 * @param  {String} collection
 * @param  {number} index
 */
async function fetchItem({ collection, index }) {
    const supportedCollections = ['films', 'people'];

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

module.exports = {
    getProfile,
    getFilm,
};
