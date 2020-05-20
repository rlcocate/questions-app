const { ServerError } = require('../errors/index');

module.exports = class HttpResponse {

    static ok(body) {
        return {
            statusCode: 200,
            body
        }
    }

    static badRequest(error) {
        return {
            statusCode: 400,
            body: {
                error: error.message
            }
        };
    }

    static serverError(error) {
        return {
            statusCode: 500,
            body: new ServerError().message + ' - ' + error
        };
    }
}