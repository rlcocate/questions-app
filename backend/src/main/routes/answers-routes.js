const AnswersRouterComposer = require('../composers/answers-router-composer');
const { index, create, like } = require('../adapters/express-router-adapter');

module.exports = router => {
    router.get('/answers/:questionId', index(AnswersRouterComposer.compose()));
    router.post('/answers', create(AnswersRouterComposer.compose()));
    router.put('/answers', like(AnswersRouterComposer.compose()));
};