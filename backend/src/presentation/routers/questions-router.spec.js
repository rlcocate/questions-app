const QuestionRouter = require('./questions-router');

const makeSut = () => {
    const questionsUseCaseSpy = makeQuestionsUseCase();
    return new QuestionRouter(questionsUseCaseSpy);
}

const makeQuestionsUseCase = () => {
    class QuestionsUseCaseSpy {
        constructor(questionRepository) {
            this.questionRepository = questionRepository;
        }
    }

    return new QuestionsUseCaseSpy(this.questionRepository);
}
describe('Questions Router', () => {
    test('Should return 500 when no repository was instancied.', async () => {
        const sut = makeSut();
        const httpResponse = await sut.index();
        expect(httpResponse.statusCode).toBe(500);
    });

    test('Should return 400 when the parameters are not provided.', async () => {
        const sut = makeSut();
        const httpRequest = {
            body: {
                text: '',
                user: ''
            }
        }
        const httpReponse = await sut.create(httpRequest);
        expect(httpReponse.statusCode).toBe(400);
    });

    test('Should return 400 when invalid parameter are provided.', async () => {
        const sut = makeSut();
        const httpRequest = {
            body: {
                text: 0,
                user: 1
            }
        }
        const httpReponse = await sut.create(httpRequest);
        expect(httpReponse.statusCode).toBe(400);
    });
});
