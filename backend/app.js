const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();


const app = express(); 

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const { dirname } = require('path');

mongoose.connect('mongodb+srv://hind1999:Biba34@cluster0.hwwgftl.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')
);

const User = require('./models/user');

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//---intercepte toutes les requêtes qui contiennent du JSON pour le mettre à disposition sur l'objet requête dans req.body
// remplace body parser


app.post("/api/auth/signup", (req, res) => {
  console.log("Signup request", req.body)
  const user = new User({
    ...req.body
  });
  user.save()
  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
    /*.then((res) => {res.send({message: "Utilisateur enregistré!"})
    })
    .catch((err) => console.log("User pas enregistré", err))*/
});

//app.get();

/*app.get('/api/sauce', (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
});*/


app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
