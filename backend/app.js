const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();


const app = express(); 
const { rateLimit } = require('express-rate-limit');


//empecher les requtes en boucle avec rateLimit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //equivalent de 10min 
  max:100 //le client pourra faire 100 requetes toutes les 10min
})

// définition des routes pour les sauces et les utilisateurs
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const { dirname } = require('path');

// la connexion à notre base de données MongoDB en utilisant l'URL de connexion stockée dans un fichier .env
mongoose.connect(process.env.CONNECT_MONGOOSE,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')
);

const User = require('./models/user');

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

//configuration pour les en-têtes CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

//exportation de l'application pour l'utilisée dans d'autres fichiers
module.exports = app;
