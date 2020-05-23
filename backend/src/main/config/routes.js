const router = require('express').Router();
const glob = require('fast-glob');

module.exports = app => {
    app.use('/api/', router);
    glob.sync('**/src/main/routes/**routes.js')
        .forEach(file => {
            require(`../../../${file}`)(router)
        });
};