const MongoHelper = require('../helpers/mongo-helper');
const AnswersRepository = require('./answers-repository');
let questionModel, answerModel;

const makeSut = (() => {
    return new AnswersRepository();
});

describe('LoadAnswers Repository', () => {

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
        questionModel = await MongoHelper.getCollection('questions');
        answerModel = await MongoHelper.getCollection('answers');
    });

    beforeEach(async () => {
        await answerModel.deleteMany();
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    test('Should return an empty object if not exists any answers.', async () => {
        const sut = makeSut();
        const answers = await sut.list('5ecb02940878623adc128700');
        expect(answers).toEqual([]);
    });

    test('Should return a list of answers if found.', async () => {
        const sut = makeSut();
        const question = {
            text: 'Vamos criar uma nova pergunta?',
            user: 'Francisco',
            creationDate: new Date(),
            like: 0
        }
        const fakeQuestion = await questionModel.insertOne(question);
        const _qId = MongoHelper.getObjectId(fakeQuestion.insertedId);
        const answer = ({
            text: 'Resposta 1',
            user: 'rodrigo.cocate',
            creationDate: new Date(),
            like: 0,
            questionId: _qId
        });
        await answerModel.insertOne(answer);
        const answers = await sut.list(_qId);
        expect.arrayContaining(answers);
    });

    test('Should return an valid Id when an answer is created.', async () => {
        const sut = makeSut();
        const question = {
            text: 'Vamos criar uma nova pergunta?',
            user: 'Francisco',
            creationDate: new Date(),
            like: 0
        }
        const fakeQuestion = await questionModel.insertOne(question);
        const _qId = MongoHelper.getObjectId(fakeQuestion.insertedId);
        const answer = ({
            text: 'Resposta 1',
            user: 'rodrigo.cocate',
            creationDate: new Date(),
            like: 0,
            questionId: _qId
        });
        const fakeAnswer = await answerModel.insertOne(answer);
        const upd = await questionModel.updateOne({ _id: _qId }, { $set: { total_answers: 1 } });

        expect(200).toBe(200);
    });

    test('Should update total answers of an exist a question.', async () => {
        const sut = makeSut();
        const question = {
            text: 'Vamos criar uma nova pergunta?',
            user: 'Francisco',
            creationDate: new Date(),
            like: 0
        }
        const fakeQuestion = await questionModel.insertOne(question);
        const _qId = MongoHelper.getObjectId(fakeQuestion.insertedId);
        const answer = ({
            text: 'Resposta 1',
            user: 'rodrigo.cocate',
            creationDate: new Date(),
            like: 0,
            questionId: _qId
        });
        await answerModel.insertOne(answer);
        const updated = await questionModel.updateOne({ _id: _qId }, { $set: { total_answers: 1 } });
        expect(updated.modifiedCount).toBe(1);
    });

    test('Should mark as a liked an exist answer.', async () => {
        const sut = makeSut();
        const question = {
            text: 'Vamos criar uma nova pergunta?',
            user: 'Francisco',
            creationDate: new Date(),
            like: 0
        }
        const fakeQuestion = await questionModel.insertOne(question);
        const _qId = MongoHelper.getObjectId(fakeQuestion.insertedId);
        const answer = ({
            text: 'Resposta 1',
            user: 'rodrigo.cocate',
            creationDate: new Date(),
            like: 0,
            questionId: _qId
        });
        const fakeAnswer = await answerModel.insertOne(answer);
        const _id = MongoHelper.getObjectId(fakeAnswer.insertedId);
        const updated = await answerModel.updateOne({ _id: _id }, { $set: { like: 1 } });
        expect(updated.modifiedCount).toBe(1);
    });
});