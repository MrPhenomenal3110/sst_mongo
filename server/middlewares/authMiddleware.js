const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET || 'scalermovies');
        req.body.userId = verifiedToken.userId;
        next();
    } catch(err) {
        res.status(401).send({
            success: false,
            message: 'Authorization token invalid !',
        })
    }
}

module.exports = authMiddleware;