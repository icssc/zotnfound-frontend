import { createContext } from "react";

const DataContext = createContext({
  data: [], // all marker data
  token: "", // firebase db auth token
  setData: () => {}, // set data
  isLoginModalOpen: false,
  onLoginModalOpen: () => {},
  onLoginModalClose: () => {},
  setLoading: () => {}, // set loading screen on or off
});

export default DataContext;
