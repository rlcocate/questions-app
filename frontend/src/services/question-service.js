import BaseService from './base/base-service';

export default class QuestionService extends BaseService {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async index() {
        return await super.index();
    }

    async create(text, user) {
        return await super.create(text, user);
    }

    async like(questionId, liked){
        return await super.like(questionId, liked);
    }
}