const request = require('supertest');
const app = require('../config/app');
const MongoHelper = require('../../infra/helpers/mongo-helper');
let questionsModel;


describe('Question Routes', () => {

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
        questionsModel = await MongoHelper.getCollection('questions')
    })

    beforeEach(async () => {
        await questionsModel.deleteMany()
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    test('Should return 200 when is requested', async () => {

        await questionsModel.insertOne({
            text: 'Qual mês da quarentena estamos?',
            user: 'rodrigo.cocate',
            creationDate: Date(),
            like: 0
        });
        await questionsModel.insertOne({
            text: 'Como chegar a cidade antiga?',
            user: 'rodrigo.cocate',
            creationDate: Date(),
            like: 0
        });
        await request(app)
            .get('/api/questions', (req, res) => {
                res.send(model.find());
            })
            .expect(200);
    });
});