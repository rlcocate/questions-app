module.exports = class AnswersUseCase {

    constructor(answersRepository){
        this.answersRepository = answersRepository
    }

    async list(questionId) {
        const answers = await this.answersRepository.list(questionId);
        if (answers)
            return answers
        return [];
    }

    async create(model){        
        return await this.answersRepository.create(model);
    }
    
    async like(answerId, liked){
        await this.answersRepository.like(answerId, liked);
    }
};