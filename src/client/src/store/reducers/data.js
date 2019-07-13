import {
  GET_DATA,
  GET_GROUPS,
  GET_ROLES,
  DELETE_DATA_ITEM,
  UPDATE_DATE_ITEM,
  UPDATE_ROLE,
  GET_USER,
  SET_SORT,
  GET_USERS_NUM,
  ADD_DATA
} from "../actions/constants";

const initialState = {
  usersData: [],
  user: null,
  sortBy: "id",
  groups: null,
  roles: null,
  userNum: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        usersData: action.payload
      };

    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload
      };

    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload
      };

    case SET_SORT:
      return {
        ...state,
        sortBy: action.payload
      };

    case GET_USERS_NUM:
      return {
        ...state,
        userNum: action.payload
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload
      };

    case UPDATE_ROLE:
      return {
        ...state,
        user: action.payload
      };

    case GET_ROLES:
      return {
        ...state,
        roles: action.payload
      };

    case ADD_DATA:
      return {
        ...state,
        usersData: [action.payload, ...state.usersData]
      };

    // case UPDATE_ROLE:
    // return {
    //   ...state,
    //   usersData: state.usersData.map(item => {
    //     if(item._id === action.payload.userId) {

    //     }
    //   })
    // };

    case DELETE_DATA_ITEM:
      return {
        ...state,
        usersData: state.usersData.filter(item => item._id !== action.payload)
      };

    case UPDATE_DATE_ITEM:
      return {
        ...state,
        usersData: state.usersData.map(item => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        })
      };

    default:
      return state;
  }
};
