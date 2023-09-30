const PlayerController = require('../controllers/player.controller');

module.exports = (app) => {
    app.get('/api', PlayerController.index);
    app.post('/api/player/new', PlayerController.createPlayer); 
    app.get('/api/player', PlayerController.getAllPlayers); 
    app.get('/api/player/:id', PlayerController.getPlayer);
    // app.patch('/api/player/:id', PlayerController.updatePlayer);
    app.patch('/api/player/game1:id', PlayerController.updatePlayerForGame1);
    app.patch('/api/player/game2:id', PlayerController.updatePlayerForGame2);
    app.patch('/api/player/game3:id', PlayerController.updatePlayerForGame3);

    app.delete('/api/player/:id', PlayerController.deletePlayer);
}
