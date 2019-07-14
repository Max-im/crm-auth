import axios from "axios";
import { GET_SESSIONS_NUM, GET_SESSIONS, GET_STAT } from "./constants";

export const getSessionsNum = () => dispatch => {
  axios
    .get("/analysts/number")
    .then(({ data }) => dispatch({ type: GET_SESSIONS_NUM, payload: data.num }))
    .catch(err => console.log(err.response.data));
};

export const getSessions = page => dispatch => {
  axios
    .get(`/analysts/${page}`)
    .then(({ data }) => dispatch({ type: GET_SESSIONS, payload: data }))
    .catch(err => console.log(err.response.data));
};

export const getStat = () => dispatch => {
  axios
    .get("/analysts/stat")
    .then(({ data }) => dispatch({ type: GET_STAT, payload: data }))
    .catch(err => console.log(err.response.data));
};
