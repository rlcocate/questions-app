const request = require('supertest');
let app;

describe('ContentType Middleware', () => {

    beforeEach(() => {
        jest.resetModules();
        app = require('../config/app');
    });

    test('Should return content-type header as Json.', async () => {
        app.get('/test_content-type', (req, res) => {
            res.send({});
        });
        await request(app)
            .get('/test_content-type')
            .expect('content-type', /json/);
    });

    test('Should return content-type as XML if forced.', async () => {
        app.get('/test_content-type', (req, res) => {
            res.type('xml');
            res.send('');
        });
        await request(app)
            .get('/test_content-type')
            .expect('content-type', /xml/);
    });
});