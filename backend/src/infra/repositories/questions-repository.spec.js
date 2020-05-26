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
        expect.not.arrayContaining(questions);
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
        expect.arrayContaining(questions);
    });

    test('Should return a new ObjectId if a question is successfully created.', async () => {
        const sut = makeSut();
        const model = {
            text: 'Vamos criar uma nova pergunta?',
            user: 'Francisco',
            creationDate: new Date(),
            like: 0
        }
        const newId = await sut.create(model);
        expect(newId).not.toBeNull();
    });

    test('Should mark as a liked an exist question.', async () => {
        const sut = makeSut();
        const model = {
            text: 'Será que vai retornar um new ObjectId?',
            user: 'Francisco',
            creationDate: new Date(),
            like: 0
        }
        const newId = await sut.create(model);
        const _id = MongoHelper.getObjectId(newId);
        await sut.like(_id, 1);
        const questions = await sut.list();
        const filtered = questions.filter(q => q._id == `${_id}`);
        expect(filtered[0].like).toBe(1);
    });
});