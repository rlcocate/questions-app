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
        const server = new ServerError();
        return {
            statusCode: 500,
            body: {
                error: new String().concat(server.message, (error !== null ? ' - ' + error : ''))
            }
             
        };
    }
}