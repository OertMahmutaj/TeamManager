import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/status.css';
import { Link } from 'react-router-dom';

const Status = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/player')
            .then((res) => {
                setPlayers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const updatePlayerStatus = (playerId, gameNumber, newStatus) => {
        axios
            .patch(`http://localhost:8000/api/player/game2${playerId}`, {
                gameNumber: gameNumber,
                newStatus: newStatus,
            })
            .then((res) => {
                const updatedPlayers = players.map((player) => {
                    if (player._id === playerId) {
                        player[`game2`].status = newStatus;
                    }
                    return player;
                });
                setPlayers(updatedPlayers);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <li>
                <Link to="/player/game1">Game 1</Link>
            </li>
            <li>
                <Link to="/player/game2">Game 2</Link>
            </li>
            <li>
                <Link to="/player/game3">Game 3</Link>
            </li>
            <div className="player-list">
                {players.map((player) => (
                    <div key={player._id} className={`player-item ${player.status}`}>
                        <p>{player.name}</p>
                        <div className="status-options">
                            <button
                                onClick={() => updatePlayerStatus(player._id, 2, 'playing')}
                                className={`status-button ${player.game2.status === 'playing' ? 'playing selected' : ''
                                    }`}
                            >
                                Playing
                            </button>
                            <button
                                onClick={() => updatePlayerStatus(player._id, 2, 'not playing')}
                                className={`status-button ${player.game2.status === 'not playing' ? 'not-playing selected' : ''
                                    }`}
                            >
                                Not Playing
                            </button>
                            <button
                                onClick={() => updatePlayerStatus(player._id, 2, 'undecided')}
                                className={`status-button ${player.game2.status === 'undecided' ? 'undecided selected' : ''
                                    }`}
                            >
                                Undecided
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Status;
