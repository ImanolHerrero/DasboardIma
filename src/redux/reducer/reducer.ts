import { FAILURE_USERS, GET_USERS, PREMIUM_USERS_FALSE, PREMIUM_USERS_TRUE, GET_ACTIVE_FALSE, GET_ACTIVE_TRUE } from "../type/users";
import { User } from "../../interfaces/state-interface"

export const initialState: { users: User[]; song: any[]; userAdmi: any[]; error: null | string} = {
    users: [],
    song: [],
    userAdmi: [],
    error: null,
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

      case PREMIUM_USERS_TRUE: {
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        };
      }
      case PREMIUM_USERS_FALSE: {
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        };
      }
      
      case GET_ACTIVE_TRUE: {
        return {
          ...state,
          users: state.users.map(user=>{
            if (user.id === action.payload.id) {
              user.deletedAt = "true";
            }
          }),
          }
        };
      

      case GET_ACTIVE_FALSE: {
        return {

        }
      }

    default:
      return state;
  }
};
