const MongoHelper = require('../helpers/mongo-helper');

module.exports = class AnswersRepository {

    async list(questionId) {
        const model = await MongoHelper.getCollection('answers');
        if (model) {
            return await model.find({ 'questionId': questionId }).toArray();
        }
        return [];
    }

    async create(model) {
        const { text, user, creationDate, like, questionId } = model;
        const answersModel = await MongoHelper.getCollection('answers');
        const newAnswer = await answersModel.insertOne({ text, user, creationDate, like: Number(like), questionId: questionId });
        const _qid = MongoHelper.getObjectId(questionId);
        const total = await answersModel.find({ 'questionId': questionId }).count();
        await this.updateTotalAnswers(_qid, total);
        return newAnswer.insertedId;
    }

    async updateTotalAnswers(questionId, total_answers) {
        const questionsModel = await MongoHelper.getCollection('questions')
        await questionsModel.updateOne(
            { '_id': questionId },
            { $set: { total_answers } }
        );
    }

    async like(answerId, liked) {
        const answerModel = await MongoHelper.getCollection('answers')
        const id = MongoHelper.getObjectId(answerId);
        await answerModel.updateOne(
            { _id: id },
            { $set: { like: Number(liked) } }
        );
    }
};