import axios from "axios";

/**
 * @access  public
 */
export const addMockData = () => dispatch => {
  let i = 0;
  axios
    .post("/add-mock-data")
    .then(({ data }) => {
      if (i > 0) return;
      i++;
      dispatch(addMockData());
    })
    .catch(err => console.error(err.response.data));
};
