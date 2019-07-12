import axios from "axios";
import {
  GET_DATA,
  GET_ROLES,
  DELETE_DATA_ITEM,
  UPDATE_DATE_ITEM,
  GET_GROUPS,
  UPDATE_ROLE,
  GET_USER,
  GET_USERS_NUM,
  ADD_DATA,
  SET_SORT
} from "./constants";

/**
 * @access Moderator and Admin
 * @param {Number} page
 */
export const getData = (page, query) => dispatch => {
  const url = query ? `/moderator/${page}${query}` : `/moderator/${page}`;

  axios
    .get(url)
    .then(({ data }) => dispatch({ type: GET_DATA, payload: data }))
    .catch(err => console.error(err.response.data));
};

/**
 * @access Moderator and Admin
 */
export const getUserNum = () => dispatch => {
  axios
    .get("/moderator/users-num")
    .then(({ data }) => dispatch({ type: GET_USERS_NUM, payload: data.num }))
    .catch(err => console.error(err.response.data));
};

export const onSetSort = value => ({
  type: SET_SORT,
  payload: value
});

/**
 * @access Admin
 * @param {Number} id - user id
 */
export const getUser = id => dispatch => {
  axios
    .get(`/admin/user/${id}`)
    .then(({ data }) => dispatch({ type: GET_USER, payload: data }))
    .catch(err => console.error(err.response.data));
};

/**
 * @access  Admin
 */
export const getRoles = () => dispatch => {
  axios
    .get("/admin/roles")
    .then(({ data }) => dispatch({ type: GET_ROLES, payload: data }))
    .catch(err => console.error(err.response.data));
};

/**
 * @access  Admin
 */
export const getGroups = () => dispatch => {
  axios
    .get("/admin/groups")
    .then(({ data }) => dispatch({ type: GET_GROUPS, payload: data }))
    .catch(err => console.error(err.response.data));
};

/**
 * @access Admin
 * @param {Object} userData
 */
export const createData = userData => dispatch => {
  axios
    .post("/admin", userData)
    .then(({ data }) => dispatch({ type: ADD_DATA, payload: data }))
    .catch(err => console.error(err.response.data));
};

/**
 * @access Admin
 * @param {Object} userData
 */
export const updateRole = userData => dispatch => {
  axios
    .put("/admin/role", userData)
    .then(({ data }) => dispatch({ type: UPDATE_ROLE, payload: data }))
    .catch(err => console.error(err.response.data));
};

/**
 * @access Admin
 * @param {Number} id - user id
 */
export const onCardDelete = id => dispatch => {
  axios
    .delete(`/admin/${id}`)
    .then(() => dispatch({ type: DELETE_DATA_ITEM, payload: id }))
    .catch(err => console.error(err.response.data));
};

/**
 * @access Admin
 * @param {Object} updateData
 * @param {Object} history
 */
export const cardUpdate = (updateData, history) => dispatch => {
  axios
    .put("/admin", updateData)
    .then(({ data }) => {
      dispatch({ type: UPDATE_DATE_ITEM, payload: data });
      history.push("/admin");
    })
    .catch(err => console.error(err.response.data));
};

/**
 * @access  Admin
 */
export const addMockData = () => dispatch => {
  let i = 0;
  axios
    .post("/admin/add-mock-data")
    .then(({ data }) => {
      if (i > 5000) return;
      i++;
      dispatch(addMockData());
    })
    .catch(err => console.error(err.response.data));
};
