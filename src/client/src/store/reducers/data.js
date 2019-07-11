import {
  GET_DATA,
  GET_GROUPS,
  GET_ROLES,
  DELETE_DATA_ITEM,
  UPDATE_DATE_ITEM,
  ADD_DATA
} from "../actions/constants";

const initialState = {
  usersData: [],
  groups: null,
  roles: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        usersData: [...state.usersData, ...action.payload]
      };

    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload
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
            console.log("here");
            return action.payload;
          }
          return item;
        })
      };

    default:
      return state;
  }
};
