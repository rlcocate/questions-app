import BaseService from './base/base-service';

export default class AnswerService extends BaseService {
    constructor(page, questionId) {
        super(page, questionId);
        this.page = page;
        this.questionId = questionId;
    }

    async index(questionId) {
        return await super.index(questionId);
    }

    async create(data) {
        return await super.create(data);
    }

    async like(answerId, liked){
        return await super.like(answerId, liked);
    }
}