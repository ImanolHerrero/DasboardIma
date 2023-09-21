// Component
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { getAllSongs, disableSong, updateSong } from '../../redux/actions/songs';
import { Link } from "react-router-dom";

const SongComponent = () => {
    const dispatch = useAppDispatch();
    const songs = useAppSelector((state) => state.song);
    const [updatedDescriptions, setUpdatedDescriptions] = useState({});

    useEffect(() => {
        dispatch(getAllSongs(9, 1));
    }, [dispatch]);

    const handleDisableSong = (songId) => {
        dispatch(disableSong(songId));
    };

    const handleUpdateSong = (songId) => {
        // Update the initial description for the song with the updated description
        dispatch(updateSong(songId, updatedDescriptions[songId] || ''));
        // Reset the updated description for the song
        setUpdatedDescriptions((prevDescriptions) => ({
            ...prevDescriptions,
            [songId]: '',
        }));
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-screen-lg p-4 mt-80">
                <h1 className="text-2xl font-bold mb-4">Songs</h1>
                {songs && songs.rows && songs.rows.length > 0 ? (
                    <ul className="space-y-4">
                        {songs.rows.map((song) => (
                            <li
                                key={song.id}
                                className="flex justify-between items-center bg-white px-4 py-3 rounded-lg shadow-md"
                            >
                                <div>
                                    <p className="font-bold">{song.name}</p>
                                    <p className="text-gray-600">{song.artist}</p>
                                    <p className="text-gray-600">{song.description}</p>
                                </div>
                                <div className="space-x-2">
                                    <input
                                        type="text"
                                        className="border border-gray-300 p-2 rounded"
                                        placeholder="Enter updated description"
                                        value={updatedDescriptions[song.id] || ''}
                                        onChange={(e) =>
                                            setUpdatedDescriptions({
                                                ...updatedDescriptions,
                                                [song.id]: e.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        onClick={() => handleUpdateSong(song.id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Update Description
                                    </button>
                                    <button
                                        onClick={() => handleDisableSong(song.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete Song
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>Loading...</div>
                )}
                <div className="flex items-center justify-center">
                    <div className="my-12">
                        <Link to="/user">
                            <button className="bg-black text-white p-4 rounded-lg">
                                View users
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongComponent;
