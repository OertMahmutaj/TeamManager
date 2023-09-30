const Player = require('../models/player.model');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.createPlayer = (request, response) => {
    if (!request.body.name || request.body.name.length < 2) {
        return response.status(400).json({ error: "Name is required and should have at least 2 characters" });
    }

    Player.create(request.body)
        .then(player => response.json(player))
        .catch(err => response.status(500).json(err));
}

module.exports.getAllPlayers = (request, response) => {
    Player.find({})
        .then(players => {
            console.log(players); 
            response.json(players);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

module.exports.getPlayer = (request, response) => {
    Player.findOne({_id:request.params.id})
        .then(player => response.json(player))
        .catch(err => response.json(err));
}

// module.exports.updatePlayer = (request, response) => {
//     const playerId = request.params.id;
//     const { gameNumber, newStatus } = request.body;
//     const update = {};
//     update[`game${gameNumber}.status`] = newStatus;
  
//     Player.findOneAndUpdate({ _id: playerId }, update, { new: true })
//       .then(updatedPlayer => response.json(updatedPlayer))
//       .catch(err => response.json(err))
// }

module.exports.updatePlayerForGame1 = (request, response) => {
    const playerId = request.params.id;
    const { newStatus } = request.body;
  
    Player.findOneAndUpdate({ _id: playerId }, { game1: { status: newStatus } }, { new: true })
      .then(updatedPlayer => response.json(updatedPlayer))
      .catch(err => response.json(err))
}

module.exports.updatePlayerForGame2 = (request, response) => {
    const playerId = request.params.id;
    const { newStatus } = request.body;
  
    Player.findOneAndUpdate({ _id: playerId }, { game2: { status: newStatus } }, { new: true })
      .then(updatedPlayer => response.json(updatedPlayer))
      .catch(err => response.json(err))
}
module.exports.updatePlayerForGame3 = (request, response) => {
    const playerId = request.params.id;
    const { newStatus } = request.body;
  
    Player.findOneAndUpdate({ _id: playerId }, { game3: { status: newStatus } }, { new: true })
      .then(updatedPlayer => response.json(updatedPlayer))
      .catch(err => response.json(err))
}

module.exports.deletePlayer = (request, response) => {
    Player.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
