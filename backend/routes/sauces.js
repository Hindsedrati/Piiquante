const express = require('express');
//le module "express" pour créer un routeur
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
//"auth" nous permets de s'assurer que l'utilisateur est authentifié avant de 
//pouvoir effectuer les actions
const multer = require('../middleware/multer-config');
//"multer" pour gérer les images associées aux sauces


router.post('/', auth, multer, saucesCtrl.createSauce);
router.post('/:id/like', auth, saucesCtrl.likeSauce);
router.put('/:id',auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;
