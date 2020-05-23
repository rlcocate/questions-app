import api from '../../config/api';

export default class BaseService {
    constructor(page) {
        this.page = page;
    }

    async index(id = null) {
        if (id != null) {
            return await api.get(`${this.page}/${id}`);
        }
        else {
            return await api.get(`${this.page}`);
        }
    }

    async create(data) {
        await api.post(`${this.page}`, data).then(response => {
            return response.data;
        });
    }

    async like(answerId, liked) {
        await api.put(`${this.page}?answerId=${answerId}&liked=${liked}`)
            .then(response => {
                return response.data;
            });
    }
}