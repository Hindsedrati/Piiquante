// importation bcrypt pour le hash du mot de passe
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// importation du models
const User = require('../models/user');

// signup pour accéder en tant que nouvel utilisateur
exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
          console.log(hash)
            const user = new User ({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({message: 'utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// login pour accéder en tant qu'utilisateur existant
exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user){
                return res.status(401).json({ error: 'utilisateur non trouvé !' });
            }
            console.log(req.body.password, user.password)
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                  console.log(valid)
                    if (!valid) {
                        return res.status(401).json({ error: 'mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_SECRET_KEY',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
/*const { User } = require("../mongo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function createUser(req, res) {
    try {
      const { email, password } = req.body
      const hashedPassword = await hashPassword(password)
      const user = new User({ email, password: hashedPassword })
      await user.save()
      res.status(201).send({ message: "Utilisateur enregistré !" })
    } catch (err) {
      res.status(409).send({ message: "User pas enregistré :" + err })
    }
  }
  
  function hashPassword(password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
  }
  
  async function logUser(req, res) {
    try {
      const email = req.body.email
      const password = req.body.password
      const user = await User.findOne({ email: email })
  
      const isPasswordOK = await bcrypt.compare(password, user.password)
      if (!isPasswordOK) {
        res.status(403).send({ message: "Mot de passe incorrect" })
      }
      const token = createToken(email)
      res.status(200).send({ userId: user?._id, token: token })
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: "Erreur interne" })
    }
  }
  
  function createToken(email) {
    const jwtPassword = process.env.JWT_PASSWORD
    return jwt.sign({ email: email }, jwtPassword, { expiresIn: "24h" })
  }
  
  module.exports = { createUser, logUser }*/
