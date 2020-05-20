const MongoHelper = require('../helpers/mongo-helper');

module.exports = class QuestionsRepository {

  async list() {
    const model = await MongoHelper.getCollection('questions');
    if (model) {
      return await model.find().toArray();
    }
    return [];
  }

  async create(model) {
    const { text, user, creationDate, like } = model;
    const questions = await MongoHelper.getCollection('questions');
    const newQuestion = await questions.insertOne({ text, user, creationDate, like: Number(like), total_answers: 0 });
    return newQuestion.insertedId;
  }

  async like(questionId, liked) {
    const questionsModel = await MongoHelper.getCollection('questions')
    const id = MongoHelper.getObjectId(questionId);
    await questionsModel.updateOne(
      { _id: id },
      { $set: { like: Number(liked) } }
    );
  }
};