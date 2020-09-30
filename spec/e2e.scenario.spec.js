const log = require('log4js').getLogger('swapi-spec');
const api = require('../src/swapi/swapi-api');

describe('swapi e2e scenario', () => {

    it('should find person by id, his homeworld and first film', async () => {
        const person = await api.getProfile({ index: 1 });

        expect(person.name).toBe('Luke Skywalker');
        expect(person.homeworld).toMatch(/http:.*/, 'got wrong homeworld url');

        const planet = await api.getUrl({ url: person.homeworld });

        expect(planet.name).toBe('Tatooine', 'got wrong planet name');
        expect(planet.population).toBe('200000', 'got wrong population');

        const firstFilm = await api.getUrl({ url: planet.films[0] });
        log.info(firstFilm);

        expect(firstFilm.title).toBe('A New Hope');
        // TODO: check characters
        expect(firstFilm.planets).toContain(person.homeworld);
    });

});
