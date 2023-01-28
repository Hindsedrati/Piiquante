//----- Implémenter des téléchargements de fichiers -----
const multer = require('multer');

//"MIME_TYPES" mappe les différents types de fichiers image à leurs extensions de fichier.
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//------ configuration de multer -------
const storage = multer.diskStorage({
//configuration pour enregistrer les fichiers téléchargés dans un dossier appelé "images" 
//sur le disque du serveur.
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
//configuration avec l'objet de stockage créé, et configuré pour gérer un seul fichier avec 
//le nom de champ "image"
module.exports = multer({ storage }).single('image');
