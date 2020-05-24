const HttpResponse = require('../helpers/http-reponse');
const { MissingParamError } = require('../../utils/errors');

module.exports = class AnswersRouter {

    constructor(answersUseCase) {
        this.answersUseCase = answersUseCase;
    }

    async index(req) {
        try {
            const { questionId } = req.params;
            if (!questionId) {
                return HttpResponse.badRequest(new MissingParamError('questionId'));
            }
            const answers = await this.answersUseCase.list(questionId);
            return HttpResponse.ok(answers);
        } catch (error) {
            console.error(error)
            return HttpResponse.serverError(error);
        }
    }

    async create(req) {
        try {
            const { text, user, questionId } = req.body;
            if (!text) {
                return HttpResponse.badRequest(new MissingParamError('text'));
            };
            if (!user) {
                return HttpResponse.badRequest(new MissingParamError('user'));
            };
            if (!questionId) {
                return HttpResponse.badRequest(new MissingParamError('questionId'));
            };
            const model = { text, user, creationDate: new Date(), like: 0, questionId };
            const _id = await this.answersUseCase.create(model)
            return HttpResponse.ok({ _id });
        } catch (error) {
            console.error(error);
            return HttpResponse.serverError(error)
        }
    }

    async like(req) {
        try {
            const { answerId, liked } = req.query;
            if (!answerId) {
                return HttpResponse.badRequest(new MissingParamError('answerId'));
            };
            if (!liked) {
                return HttpResponse.badRequest(new MissingParamError('liked'));
            };
            await this.answersUseCase.like(answerId, liked);
            return HttpResponse.ok({ '_id': answerId, 'like': liked });
        } catch (error) {
            console.error(error);
            return HttpResponse.serverError(error)
        }
    }
};