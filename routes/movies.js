const expres = require('express');
const { Genre } = require('../models/genre');
const router = expres.Router();
const { Movie, validate } = require('../models/movie');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
    throw new Error('Could not get movies');
    const movies = await Movie.find().sort('title');
    return res.send(movies);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const genre = await Genre.findById(req.body.genreId);
    if(!genre){
        return res.status(404).send('Invalid Genre..');
    }
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id : genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre){
        return res.status(404).send('Invalid Genre..');
    }

    const movie = await Movie.findByIdAndUpdate(req.paramsms.id, {
        title: req.body.title,
        genre: {
            _id : genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {new: true});

    if(!movie){
        return res.status(404).send("Movie with given ID not found!");
    }
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie){
        return res.status(404).send("Movie with given ID not found!");
    }
    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        return res.status(404).send("Movie with given ID not found!");
    }
    res.send(movie);
});

module.exports = router;