import { FAILURE_USERS, GET_USERS, PREMIUM_USERS_FALSE, PREMIUM_USERS_TRUE, GET_ACTIVE_FALSE, GET_ACTIVE_TRUE } from "../type/users";
import { User } from "../../interfaces/state-interface";
import {
  GET_ALL_SONGS, DISABLE_SONG, UPDATE_SONG_DESCRIPTION_START, UPDATE_SONG_DESCRIPTION_SUCCESS, UPDATE_SONG_DESCRIPTION_FAILURE
} from './../type/songs';

export const initialState: { users: User[]; song: any[]; userAdmi: any[]; error: null | string; updatingSongDescription: any } = {
  users: [],
  song: [],
  userAdmi: [],
  error: null,
  updatingSongDescription: false,
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        error: null,
      };

    case FAILURE_USERS:
      return {
        ...state,
        error: action.payload,
      };

    case "GET_USER_ADMI":
      return {
        ...state,
        userAdmi: action.payload,
      };

    case PREMIUM_USERS_TRUE:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case PREMIUM_USERS_FALSE:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case GET_ACTIVE_TRUE:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            user.deletedAt = "true";
          }
          return user;
        }),
      };

    case GET_ACTIVE_FALSE:
      return {
        ...state,
        // Handle GET_ACTIVE_FALSE action
      };

    case GET_ALL_SONGS:
      return {
        ...state,
        song: action.payload,
      };

    case DISABLE_SONG:
      if (!Array.isArray(state.song)) {
        console.error('state.song is not an array');
        return state;
      }

      const songIndex = state.song.findIndex(song => song.id === action.payload);
      if (songIndex !== -1) {
        const updatedSongs = [...state.song];
        updatedSongs.splice(songIndex, 1); // Remove 1 element at the found index
        return {
          ...state,
          song: updatedSongs,
        };
      }
      return state; // Return the unchanged state if the song was not found

    case UPDATE_SONG_DESCRIPTION_START:
      return {
        ...state,
        updatingSongDescription: true,
      };

    case UPDATE_SONG_DESCRIPTION_SUCCESS:
      const { songId, updatedDescription } = action.payload;

      console.log('Type of state.song:', typeof state.song); // Log the type of state.song

      // Check if state.song is an array
      if (!Array.isArray(state.song)) {
        console.error('state.song is not an array');
        console.log('state:', state); // Log the state for further inspection
        return state;
      }

      const updatedSongs = state.song.map((song) =>
        song.id === songId ? { ...song, description: updatedDescription } : song
      );
      return {
        ...state,
        song: updatedSongs,
        updatingSongDescription: false,
      };



    case UPDATE_SONG_DESCRIPTION_FAILURE:
      return {
        ...state,
        updatingSongDescription: false,
        error: action.payload,
      };


    default:
      return state;
  }
};
