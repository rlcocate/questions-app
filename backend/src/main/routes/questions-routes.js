const QuestionsRouterComposer = require('../composers/questions-router-composer');
const { index, create, like } = require('../adapters/express-router-adapter');

module.exports = router => {
    router.get('/questions', index(QuestionsRouterComposer.compose()));
    router.post('/questions', create(QuestionsRouterComposer.compose()));
    router.put('/questions', like(QuestionsRouterComposer.compose()));
};