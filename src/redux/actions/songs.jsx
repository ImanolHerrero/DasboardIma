// Import necessary dependencies
import axios from 'axios';
import {
    GET_ALL_SONGS, DISABLE_SONG, UPDATE_SONG_DESCRIPTION_START, UPDATE_SONG_DESCRIPTION_SUCCESS, UPDATE_SONG_DESCRIPTION_FAILURE
} from '../type/songs';

export const getAllSongs = (onPage, page) => {
    const payload = { onPage: onPage, page: page };
    console.log('Payload for getAllSongs:', payload);

    return async (dispatch) => {
        try {
            const response = await axios.get(`http://ec2-18-221-249-255.us-east-2.compute.amazonaws.com/song?onPage=${onPage}&page=${page}`);
            dispatch({
                type: GET_ALL_SONGS,
                payload: response.data
            });
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };
};

export const disableSong = (songId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://ec2-18-221-249-255.us-east-2.compute.amazonaws.com/song/${songId}`);

            dispatch({
                type: DISABLE_SONG,
                payload: songId,
            });
        } catch (error) {
            console.error('Error disabling song:', error);
        }
    };
};

export const updateSong = (songId, updatedDescription) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_SONG_DESCRIPTION_START });

        try {
            const response = await axios.put(`http://ec2-18-221-249-255.us-east-2.compute.amazonaws.com/song/${songId}`, {
                description: updatedDescription,
            });

            dispatch({
                type: UPDATE_SONG_DESCRIPTION_SUCCESS,
                payload: { songId, updatedDescription },
            });
        } catch (error) {
            dispatch({ type: UPDATE_SONG_DESCRIPTION_FAILURE, payload: error.message });
            console.error('Error updating song description:', error);
        }
    };
};

