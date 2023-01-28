
//-------------- Authentifiaction --------------
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        req.auth = { userId };
        // -------- vérification l'identité de l'utilisateur
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User Id non valide !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'unauthorized request !' });
    }
};

 
