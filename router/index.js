const express=require('express');
const controllers=require('../controllers/movieController');
const upload = require('../config/multer');

const router= express();

router.get('/',controllers.defaultCon);
router.get('/add',controllers.Addform);
// router.get('/singleView/:id',controllers.singleView);
router.post('/addMovies',upload.single('poster'),controllers.addMovieCon);
router.get('/singleMovieRec/:id',controllers.singleRecCon);
router.post('/updatedMovies/:id',upload.single('poster'),controllers.upadatedMovieCon);
router.get('/deleteMovie/:id',controllers.deleteCon);



module.exports= router;