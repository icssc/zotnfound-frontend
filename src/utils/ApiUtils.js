import axios from "axios";

export const getItems = async () => {
  return axios
    .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/`)
    .catch((err) => console.log(err));
};

export const getLeaderboard = async () => {
  return axios
    .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/leaderboard/`)
    .catch((err) => console.log(err));
};

export const deleteItem = (props, token) => {
  axios
    .delete(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // verify auth
      },
    })
    .then(() => console.log("Success"))
    .catch((err) => console.log(err));
};
