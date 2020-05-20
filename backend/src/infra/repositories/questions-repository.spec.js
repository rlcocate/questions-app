const MongoHelper = require('../helpers/mongo-helper');
const QuestionsRepository = require('./questions-repository');
let questionModel;

const makeSut = (() => {
    return new QuestionsRepository();
});

describe('LoadQuestions Repository', () => {

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
        questionModel = await MongoHelper.getCollection('questions');
    });

    beforeEach(async () => {
        await questionModel.deleteMany();
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    test('Should return an empty object if not exists any questions.', async () => {
        const sut = makeSut();
        const questions = await sut.list();
        expect(questions).toEqual([]);
    });

    test('Should return a list of questions if found.', async () => {
        const sut = makeSut();
        await questionModel.insertOne({
            text: 'Que dia é hoje?',
            user: 'rodrigo.cocate',
            creationDate: new Date(),
            like: 0
        });
        await questionModel.insertOne({
            text: 'Uma nova pergunta',
            user: 'rodrigo.cocate',
            creationDate: new Date(),
            like: 0
        });

        const questions = await sut.list();
        expect(questions).not.toEqual([]);
    });

});