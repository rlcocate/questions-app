import BaseService from './base/base-service';
import api from '../config/api';

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

    async like(questionId, liked) {
        await api.put(`questions?questionId=${questionId}&liked=${liked}`)
            .then(response => {
                return response.data;
            });
    }
}