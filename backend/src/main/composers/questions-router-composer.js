const QuestionsRouter = require('../../presentation/routers/questions-router');
const QuestionsUseCase = require('../../domain/usecases/questions-usecase');
const QuestionsRepository = require('../../infra/repositories/questions-repository');

module.exports = class QuestionsRouterComposer {
        
    static compose() {
        const questionsRepository = new QuestionsRepository();
        const questionsUseCase = new QuestionsUseCase(questionsRepository);
        return new QuestionsRouter(questionsUseCase);
    }
};