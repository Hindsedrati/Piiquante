// importation bcrypt pour le hash du mot de passe
const validator = require('validator');
const bcrypt = require('bcrypt');
//le module'bcrypt' pour hasher les mots de passe lors de la création de 
//compte et pour comparer les mots de passe lors de la connexion
const jwt = require('jsonwebtoken');
//le module 'jsonwebtoken' pour créer un jeton d'authentification valide pour 
//l'utilisateur qui se connecte avec succès
require('dotenv').config();
const cryptojs = require('crypto-js');
// importation du models
const User = require('../models/user');

// signup pour accéder en tant que nouvel utilisateur
exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            if(validator.isEmail(req.body.email)){
                const user = new User ({
                    email: cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString(),
                    password: hash
                })
                user.save()
                    .then(() => res.status(201).json({message: 'utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            
            }else{
                return res.status(400).json({error: 'Adresse e-mail invalide'});
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// login pour accéder en tant qu'utilisateur existant
exports.login = (req, res, next) => {
    const cryptedResearchedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString();
    User.findOne({ email: cryptedResearchedEmail})
        .then(user => {
            if (!user){
                return res.status(401).json({ error: 'utilisateur non trouvé !' });
            }
            
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

