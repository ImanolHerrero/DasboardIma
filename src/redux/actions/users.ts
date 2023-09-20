import axiosIntances from "../../utils/axiosConfig";
import { AxiosInstance } from "axios";
import { Dispatch } from "redux";
import { GET_USERS, FAILURE_USERS, PREMIUM_USERS_TRUE, PREMIUM_USERS_FALSE, GET_ACTIVE_TRUE, GET_ACTIVE_FALSE } from "../type/users";
import { AnyAction } from "redux"; 
import { User } from "../../interfaces/state-interface";


const getUsersSuccess = (data: any) => ({
  type: GET_USERS,
  payload: data,
});

const getPremiumUsersTrue = (user: User) => ({
  type: PREMIUM_USERS_TRUE,
  payload: user,
});

const getPremiumUsersFalse = (user: User) => ({
  type: PREMIUM_USERS_FALSE,
  payload: user,
});

const getActiveUsersTrue = (userId: string) => ({
  type: GET_ACTIVE_TRUE,
  payload: userId,
});

const getActiveUsersFalse = (userId: string) => ({
  type: GET_ACTIVE_FALSE,
  payload: userId,
});

const getUsersFailure = (error: any) => ({
  type: FAILURE_USERS,
  payload: error,
});

export const fetchUserData = (onPage: number, page: number) => async (
  dispatch: Dispatch<AnyAction>
): Promise<any> => {
  try {
    const token = localStorage.getItem("coder_token");

    onPage = onPage || 5;
    page = page || 1;
    if (token) {
      const axios: AxiosInstance = axiosIntances();
      axios.defaults.headers.common["coder_token"] = `${token}`;

      const response = await axios.get(
        `/user/all?onPage=${onPage}&page=${page}`
      );

      dispatch(getUsersSuccess(response.data.users));
      return response.data
    }
  } catch (error) {
    dispatch(getUsersFailure(error));
  }
};

export const fetchUserPremiumTrue = (userId: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<any> => {
  try {
    const token = localStorage.getItem("coder_token");

    if (token) {
      const axios: AxiosInstance = axiosIntances();
      axios.defaults.headers.common["coder_token"] = `${token}`;

      const response = await axios.patch(`/user/premium/${userId}?premium=true`);
      if (response.status === 200) {
        const id = response.data.id;
        dispatch(getPremiumUsersTrue(id));
      }
    }
  } catch (error) {
    dispatch(getUsersFailure(error));
    return false;
  }
};

export const fetchUserPremiumFalse = (userId: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<any> => {
  try {
    const token = localStorage.getItem("coder_token");

    if (token) {
      const axios: AxiosInstance = axiosIntances();
      axios.defaults.headers.common["coder_token"] = `${token}`;

      const response = await axios.patch(`/user/premium/${userId}?premium=false`);
      if (response.status === 200) {
        const id = response.data.id;
        dispatch(getPremiumUsersFalse(id));
      }
    }
  } catch (error) {
    dispatch(getUsersFailure(error));
    return false;
  }
};

export const fetchUserActiveTrue = (userId: string) => async (dispatch: Dispatch):Promise<any>=>{
  try {
    const token = localStorage.getItem("coder_token");

    if (token) {
      const axios: AxiosInstance = axiosIntances();
      axios.defaults.headers.common["coder_token"] = `${token}`;

      const response = await axios.delete(`/user/${userId}`);
      console.info(response)
      const row = response.data
      if (response.status === 200 && +row === 1) {
        dispatch(getActiveUsersTrue(userId))
      }

    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchUserActiveFalse = (userId: string) => async (dispatch: Dispatch):Promise<any>=>{
  try {
    const token = localStorage.getItem("coder_token");

    if(token){
      const axios: AxiosInstance = axiosIntances();
      axios.defaults.headers.common["coder_token"] = `${token}`;

      console.log(userId);
      

      const response = await axios.get(`/user/active/${userId}`);
      console.log(response);
      
      const row = response.data
      if (response.status === 200 && +row === 1) {
        dispatch(getActiveUsersFalse(userId))
      }
    }
  } catch (error) {
    console.info(error)
  }
}