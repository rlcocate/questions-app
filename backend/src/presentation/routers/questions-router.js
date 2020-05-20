const HttpResponse = require('../helpers/http-reponse');
const { MissingParamError } = require('../../utils/errors');

module.exports = class QuestionRouter {

    constructor(questionsUseCase) {
        this.questionsUseCase = questionsUseCase;
    }

    async index() {
        try {
            const questions = await this.questionsUseCase.list();
            return HttpResponse.ok(questions);
        } catch (error) {
            // console.error(error)
            return HttpResponse.serverError();
        }
    }

    async create(req) {
        try {
            const { text, user } = req.body;
            if (!text) {
                return HttpResponse.badRequest(new MissingParamError('text'));
            };
            if (!user) {
                return HttpResponse.badRequest(new MissingParamError('user'));
            };
            const body = { text, user, creationDate: new Date(), like: 0, total_answers: 0 };
            const _id = await this.questionsUseCase.create(body);
            return HttpResponse.ok({ _id });
        } catch (error) {
            // console.error(error);
            return HttpResponse.serverError(error)
        }
    }

    async like(req) {
        try {
            const { questionId, liked } = req.query;
            if (!questionId) {
                return HttpResponse.badRequest(new MissingParamError('questionId'));
            };
            if (!liked) {
                return HttpResponse.badRequest(new MissingParamError('liked'));
            };
            await this.questionsUseCase.like(questionId, liked);
            return HttpResponse.ok({ '_id': questionId, 'like': liked });
        } catch (error) {
            // console.error(error);
            return HttpResponse.serverError(error)
        }
    }
};