// utilisation des modules "http" et "app" pour créer un serveur qui utilise l'application 
//définie dans notre "app.js"
const http = require('http');
const app = require('./app');


//normalizePort() est utilisée pour obtenir un nombre  de port à utiliser pour le serveur
const normalizePort = val => {
  const port = parseInt(val, 10);
  
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
//"port" est définie en utilisant soit le port d'environnement spécifié, soit le port 3000 par défaut
const port = normalizePort(process.env.PORT || '3000'); 
app.set('port', port);

//errorHandler: gestionnaire d'erreur est utilisé pour gérer les erreurs qui peuvent survenir
//lors de la création et de l'écoute du serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


// le serveur écoute sur le port spécifié et imprime un message indiquant qu'il écoute sur ce port
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
});

server.listen(port);


