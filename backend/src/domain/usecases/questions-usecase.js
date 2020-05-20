module.exports = class QuestionsUseCase {

    constructor(questionsRepository){
        this.questionsRepository = questionsRepository
    }

    async list() {
        const questions = await this.questionsRepository.list();
        if (questions)
            return questions
        return [];
    }

    async create(model){        
        return await this.questionsRepository.create(model);
    }

    async like(questionId, liked){
        await this.questionsRepository.like(questionId, liked);
    }
};