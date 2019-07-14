import { GET_SESSIONS_NUM, GET_SESSIONS, GET_STAT } from "../actions/constants";

const initialState = {
  sessionsNumber: null,
  sessions: null,
  stat: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS_NUM:
      return {
        ...state,
        sessionsNumber: action.payload
      };

    case GET_SESSIONS:
      return {
        ...state,
        sessions: action.payload
      };
    case GET_STAT:
      return {
        ...state,
        stat: action.payload
      };

    default:
      return state;
  }
};
