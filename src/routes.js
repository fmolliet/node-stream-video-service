const { Router } = require('express');

const _controller = require('./controller');

const routes = Router(); 

routes
    .get('/:movieId', (req, res) =>{ res.render('index', { movieId: req.params.movieId}); })
    .get('/movies/:movieId', _controller.getMovie );

module.exports = routes;