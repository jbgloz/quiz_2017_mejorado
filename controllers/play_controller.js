var models = require("../models");
var Sequelize = require('sequelize');

var paginate = require('../helpers/paginate').paginate;


// Autoload la pista asociado a :partidaId
exports.load = function (req, res, next, partidaId) {

    models.Partidas.findById(partidaId)
        .then(function (partida) {
            if (partida) {
                req.partida = partida;
                next();
            } else {
                next(new Error('No existe partidaId=' + partidaId));
            }
        })
        .catch(function (error) {
            next(error);
        });
};


// GET /partidas
exports.index = function (req, res, next) {
    console.log('Entro al GET');

    var countOptions = {
        where: {
            userId: {$eq: req.session.user.id}
        }
    };

    var title = "Partidas jugadas por "+req.session.user.username;

    if(req.session.user.isAdmin){
        countOptions = {};
        title = "Partidas jugadas";
        console.log('Admin detectado');
    }

    // Busquedas:
    var search = req.query.search || '';
    if (search) {
        var search_like = "%" + search.replace(/ +/g,"%") + "%";

        countOptions.where.question = { $like: search_like };
    }

    models.Partidas.count(countOptions)
        .then(function (count) {
            console.log('Pasa la primera promesa');
            console.log(' -> Se han contado: '+count);

            // Paginacion:

            var items_per_page = 10;

            // La pagina a mostrar viene en la query
            var pageno = parseInt(req.query.pageno) || 1;

            // Crear un string con el HTML que pinta la botonera de paginacion.
            // Lo añado como una variable local de res para que lo pinte el layout de la aplicacion.
            res.locals.paginate_control = paginate(count, items_per_page, pageno, req.url);

            var findOptions = countOptions;

            findOptions.offset = items_per_page * (pageno - 1);
            findOptions.limit = items_per_page;
            findOptions.include = [{model: models.User, as: 'user0'}];
            console.log('Va a hacer el findAll');
            return models.Partidas.findAll(findOptions);
        })
        .then(function (partidas) {
            console.log('Pasa la segunda promesa');
            for(valor in partidas[0].dataValues)
            console.log(valor);

            res.render('partidas/lista.ejs', {
                partidas: partidas,
                search: search,
                title: title
            });
        })
        .catch(function (error) {
            next(error);
        });
};

// DELETE /partidas/:partidaId
exports.destroy = function (req, res, next) {
    if(req.session.user && (req.session.user.id === req.partida.userId || req.session.user.isAdmin)){
        req.partida.destroy()
            .then(function () {
                req.flash('success', 'Partida borrada con éxito.');
                res.redirect('/goback');
            })
            .catch(function (error) {
                req.flash('error', 'Error al borrar la partida: ' + error.message);
                next(error);
            });
    }else{
        var err = new Error("No autorizado");
        req.flash("error","No autorizado");
        err.status = 403;
        next(err);
    }

};

