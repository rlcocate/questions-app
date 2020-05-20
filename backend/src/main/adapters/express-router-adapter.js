module.exports = class ExpressRouterAdapter {

  static index(router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
        params: req.params
      }
      const httpResponse = await router.index(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }

  static create(router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.create(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
  
  static like(router) {
    return async (req, res) => {
      const httpRequest = {
        query: req.query
      }
      const httpResponse = await router.like(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
