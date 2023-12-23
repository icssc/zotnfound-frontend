import axios from "axios";

const deleteItem = (props, token) => {
    axios
      .delete(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // verify auth
        },
      })
      .then(() => console.log("Success"))
      .catch((err) => console.log(err));
}

export { deleteItem };