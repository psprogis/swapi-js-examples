const log = require('log4js').getLogger('spec-logger');
const api = require('../src/swapi/swapi-api');
const service = require('../src/swapi/swapi-service');
const testData = require('../test-data/persons');

describe('swapi simple tests', () => {

    /*
     * Create a test, which will verify the following data using REST Api:
     * - given a base url: https://swapi.co/
     * - get a resource: /people/1/
     * - change all links in “films” array with actual movie titles
     * - assert that received result (whole character data containing substituted films data)
     *   equals to the expected data
    */
    it('should return person and list of films for this person', async () => {
        const { lukeWithFilms } = testData;
        const person = await api.getProfile({ index: 1 });

        const filmTitles = await service.extractFilmTitles(person.films);

        person.films = filmTitles;

        log.info('expected person with films:');
        log.info(person);

        expect(person).toEqual(lukeWithFilms, 'got wrong person response.');

    }, 30000); // swapi is slow, so let's wait more

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
        expect(firstFilm.characters).toContain(person.url);
        expect(firstFilm.planets).toContain(person.homeworld);
    });

    it('should get pilots on Millennium Falcon', async () => {
        const pilots = await api.getPilots('Millennium Falcon');

        expect(pilots).toEqual(['Chewbacca', 'Han Solo', 'Lando Calrissian', 'Nien Nunb']);
    });

    it('should return empty array for Death Star', async () => {
        const pilots = await api.getPilots('Death Star');

        expect(pilots).toEqual([]);
    });

    describe('get climate', () => {
        const expectedPlanets = [
            {
                name: 'Yavin IV',
                climate: 'temperate, tropical',
            },
            {
                name: 'Dagobah',
                climate: 'murky',
            },
            {
                name: 'Naboo',
                climate: 'temperate',
            },
        ];

        expectedPlanets.forEach(planet => {
            it(`should get climate on ${planet.name}`, async () => {
                expect(await api.getClimate(planet.name)).toBe(planet.climate);
            });
        });

        it('should throw error for unknown planet - swapi returns empty array', async () => {
            try {
                await api.getClimate('Earth');
            } catch (e) {
                expect(e.message).toMatch(/no items found by name: Earth/);
            }
        });
    });
});
