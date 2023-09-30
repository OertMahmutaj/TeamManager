import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/playerlist.css';

const PlayerList = (props) => {
  const [players, setPlayers] = useState([]);
  const [updated, setUpdated] = useState(false);

  const removeFromDom = (playerId, playerName) => {
    setPlayers(players.filter((player) => player._id !== playerId));
    toast.success(`Player ${playerName} has been deleted!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const deletePlayer = (playerId, playerName) => {
    axios
      .delete(`http://localhost:8000/api/player/${playerId}`)
      .then((res) => {
        removeFromDom(playerId, playerName);
        setUpdated(!updated);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/player')
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updated]);

  const sortedPlayers = Array.isArray(players)
    ? players.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    : [];

  return (
    <div className="player-list-container">
      <Link to="/player/new" className="add-player-link">Add Player</Link>
      
      {sortedPlayers.map((player) => (
        <div className="player-card" key={player._id}>
          <div className="player-info">
            <p className="player-name">{player.name}</p>
            <p className="player-position">Position: {player.position}</p>
          </div>
          <div className="player-status">
            <p className="status-label">Status:</p>
            <p className="status-value">{player.game1.status}</p>
            <p className="status-value">{player.game2.status}</p>
            <p className="status-value">{player.game3.status}</p>
          </div>
          <button
            onClick={() => deletePlayer(player._id, player.name)}
            className="delete-button"
          >
            Delete Player
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
