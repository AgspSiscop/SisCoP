module.exports = (handlerFn) => {    
    return (req, res, next) => {
        return Promise.resolve(handlerFn(req, res, next)).catch(error => next(error));
    }
}
