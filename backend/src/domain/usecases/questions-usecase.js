const { MissingParamError } = require('../../utils/errors');
const { ServerError } = require('../../presentation/errors/index');

let questions;

module.exports = class QuestionsUseCase {

    constructor(questionsRepository){
        this.questionsRepository = questionsRepository
    }

    // constructor ({ loadUserByEmailRepository, updateAccessTokenRepository, encrypter, tokenGenerator } = {}) {
    //     this.loadUserByEmailRepository = loadUserByEmailRepository
    //     this.updateAccessTokenRepository = updateAccessTokenRepository
    //     this.encrypter = encrypter
    //     this.tokenGenerator = tokenGenerator
    //   }

    async list() {
        // if (!email) {
        //     throw new MissingParamError('email')
        // }
        // if (!password) {
        //     throw new MissingParamError('password')
        // }
        questions = await this.questionsRepository.list();
        if (questions)
            return questions
        //const isValid = user && await this.encrypter.compare(password, user.password)
        // if (isValid) {
        //     const accessToken = await this.tokenGenerator.generate(user._id)
        //     await this.updateAccessTokenRepository.update(user._id, accessToken)
        //     return accessToken
        // }
        return [];
    }

    async create(model){        
        if (!model.text) {
            return HttpResponse.badRequest(new MissingParamError('text'));
        };
        if (!model.user) {
            return HttpResponse.badRequest(new MissingParamError('user'));
        };
        const _id = await this.questionsRepository.create(model);
        return _id;
    }

    async like(questionId, liked){
        await this.questionsRepository.like(questionId, liked);
    }
};