var timestamp = function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
};

module.exports = timestamp;
