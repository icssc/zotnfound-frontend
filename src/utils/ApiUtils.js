import axios from "axios";

export const getItems = async () => {
  return axios
    .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/`)
    .catch((err) => console.log(err));
};

// Get email associated with item id
export const getItemEmail = (props, token) => {
  return axios
    .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/${props.id}/email`, {
      headers: {
        Authorization: `Bearer ${token}`, // verify auth
      },
    })
    .catch((err) => console.log(err));
};

export const getLeaderboardCount = async () => {
  return axios
    .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/leaderboard/count`)
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
