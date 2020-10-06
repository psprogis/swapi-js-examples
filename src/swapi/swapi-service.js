const log = require('log4js').getLogger('swapi-service');
const api = require('./swapi-api');
const utils = require('../utils/utils');

async function extractFilmTitles(filmsUrls) {

    log.info('get film title for the following urls:');
    log.info(filmsUrls);

    const films = await Promise.all(
        filmsUrls
            .map(utils.getIndexFromSwapiUrl)
            .map(index => api.getFilm({ index })),
    );

    return films.map(film => film.title);

    // const getAllFilms = filmsUrls
    //     .map(utils.getIndexFromUrl)
    //     .map(index => api.getFilm({ index }));

    // return (await Promise.all(getAllFilms))
    //     .map(film => film.title);
}

module.exports = {
    extractFilmTitles,
};
