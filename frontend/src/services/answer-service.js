import BaseService from './base/base-service';
import api from '../config/api';

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

    async like(answerId, liked) {
        await api.put(`answers?answerId=${answerId}&liked=${liked}`)
            .then(response => {
                return response.data;
            });
    }
}