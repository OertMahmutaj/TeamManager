import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/playerform.css';

const PlayerForm = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [errors, setErrors] = useState([]);
    const [player, setPlayer] = useState([]);

    const addPlayerToList = (newPlayer) => {
        setPlayer([...player, newPlayer]);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const playerData = { name, position };

        axios
            .post('http://localhost:8000/api/player/new', playerData)
            .then((res) => {
                console.log(res.data);
                addPlayerToList(res.data);
                setName('');
                setPosition('');
                setErrors([]);
                navigate('/player');
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.error) {
                    setErrors([err.response.data.error]);
                } else {
                    console.log(err);
                }
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={onSubmitHandler}>
                {errors.length > 0 && (
                    <div className="error-message">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <label className="form-label">Name:</label>
                <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="form-label">Position:</label>
                <input
                    type="text"
                    className="form-input"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <button type="submit" className="form-button">
                    Add Player
                </button>
            </form>
        </div>
    );
};

export default PlayerForm;
