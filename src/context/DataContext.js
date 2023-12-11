import { createContext } from "react";

const DataContext = createContext({
  data: [],
  token: "",
  isLoginModalOpen: false,
  onLoginModalOpen: () => {},
  onLoginModalClose: () => {},
  setLoading: () => {},
});

export default DataContext;
