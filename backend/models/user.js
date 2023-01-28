const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');
//module "mongoose-unique-validator" pour valider l'unicité de l'email
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
//Ce modèle sera utilisé pour créer et manipuler des documents de données 
//d'utilisateurs dans la base de données MongoDB
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
