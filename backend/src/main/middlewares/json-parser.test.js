const request = require('supertest');
const app = require('../config/app');

describe('JSON Parser Setup', () => {
    test('Should parser body as Json.', async () => {
        app.post('/test_json_parser', (req, res) => {
            res.send(req.body);
        });
        await request(app)
            .post('/test_json_parser')
            .send({ name: 'Cocate' })
            .expect({ name: 'Cocate' })
    });
});