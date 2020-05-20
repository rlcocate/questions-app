const AnswersRouter = require('../../presentation/routers/answers-router');
const AnswersUseCase = require('../../domain/usecases/answers-usecase');
const AnswersRepository = require('../../infra/repositories/answers-repository');

module.exports = class AnswersRouterComposer {
    static compose() {
        const answersRepository = new AnswersRepository();
        const answersUseCase = new AnswersUseCase(answersRepository);
        return new AnswersRouter(answersUseCase);
    }
};