const db = require('../database/models');
const sequelize = db.sequelize;
const {validationResult} = require("express-validator");
//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        // TODO   
        res.render ("moviesAdd")
    },
    create: function (req, res) {
        // TODO
        let errors = validationResult (req);
       
        if(errors.isEmpty()){
            //guardamos los datos en DB
            const {title, rating, release_date, awards, length} = req.body;
            db.Movie.create({
                title, 
                rating, 
                release_date, 
                awards, 
                length
            })
            .then((movie)=>res.redirect("/movies"))
            .catch((error)=>res.send(error))
        }else{
            res.send(errors)
            //mostramos errores en formulario
        }
    },
    edit: function(req, res) {
        // TODO
        db.Movie.findByPk(req,params.id)
        .then((Movie)=>res.render("moviesEdit", {Movie}))
        .catch((error)=>res.send(error))
    },
    update: function (req,res) {
        // TODO
        let errors = validationResult (req);
        res.send(errors)
        if(errors.isEmpty()){
            //actualizamos los datos en DB
        }else{
            //mostramos errores en formulario
        }
    },
    delete: function (req, res) {
        // TODO
    },
    destroy: function (req, res) {
        // TODO
    }

}

module.exports = moviesController;