const { MissingParamError } = require('../../utils/errors');

let answers;

module.exports = class AnswersUseCase {

    constructor(answersRepository){
        this.answersRepository = answersRepository
    }

    // constructor ({ loadUserByEmailRepository, updateAccessTokenRepository, encrypter, tokenGenerator } = {}) {
    //     this.loadUserByEmailRepository = loadUserByEmailRepository
    //     this.updateAccessTokenRepository = updateAccessTokenRepository
    //     this.encrypter = encrypter
    //     this.tokenGenerator = tokenGenerator
    //   }

    async list(questionId) {
        if (!questionId) {
            throw new MissingParamError('questionId')
        }
        answers = await this.answersRepository.list(questionId);
        if (answers)
            return answers
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
            throw new MissingParamError('text');
        };
        if (!model.user) {
            throw new MissingParamError('user');
        };
        if (!model.creationDate) {
            throw new MissingParamError('creationDate');
        };
        if (model.like == null) {
            throw new MissingParamError('like');
        };
        const _id = await this.answersRepository.create(model);
        return _id;
    }
    
    async like(answerId, liked){
        await this.answersRepository.like(answerId, liked);
    }
};