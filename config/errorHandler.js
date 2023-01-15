module.exports = (handlerFn) => {    
    return (req, res, next) => {
        return Promise.resolve(handlerFn(req, res, next)).catch(error => next(error));
    }
}

class InternalServerError extends Error {
    constructor(msg){
        super(msg);
        this.name = 'InternalServerError';
        this.statusCode = 500;
    }
  }