var http = require('http');
var app = require('./servidor/config/express');

http.createServer(app).listen(3000, function() {
	console.log('Servidor iniciado');
});
