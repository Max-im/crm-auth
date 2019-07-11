import axios from "axios";
import {
  GET_DATA,
  GET_ROLES,
  DELETE_DATA_ITEM,
  UPDATE_DATE_ITEM,
  GET_GROUPS,
  ADD_DATA
} from "./constants";

export const getData = skipNum => dispatch => {
  axios
    .get(`/data/${skipNum}`)
    .then(({ data }) => dispatch({ type: GET_DATA, payload: data }))
    .catch(err => console.error(err));
};

export const getRoles = () => dispatch => {
  axios
    .get("/data/roles")
    .then(({ data }) => dispatch({ type: GET_ROLES, payload: data }))
    .catch(err => console.error(err));
};

export const getGroups = () => dispatch => {
  axios
    .get("/data/groups")
    .then(({ data }) => dispatch({ type: GET_GROUPS, payload: data }))
    .catch(err => console.error(err));
};

export const createData = userData => dispatch => {
  axios
    .post("/data", userData)
    .then(({ data }) => {
      console.log(data);
      dispatch({ type: ADD_DATA, payload: data });
    })
    .catch(err => console.error(err));
};

export const onCardDelete = id => dispatch => {
  axios
    .delete(`/data/${id}`)
    .then(() => dispatch({ type: DELETE_DATA_ITEM, payload: id }))
    .catch(err => console.error(err));
};

export const cardUpdate = (updateData, history) => dispatch => {
  axios
    .put("/data", updateData)
    .then(({ data }) => {
      dispatch({ type: UPDATE_DATE_ITEM, payload: data });
      history.push("/admin");
    })
    .catch(err => console.error(err));
};

export const addMockData = () => dispatch => {
  let i = 0;
  axios
    .post("/data/add-mock-data")
    .then(({ data }) => {
      // if (i > 5000) return;
      // i++;
      // dispatch(addMockData());
    })
    .catch(err => console.error(err));
};
