import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import UpdatePage from "./components/UpdatePage/UpdatePage";
import Playground from "./components/Playground/Playground";

import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import { AuthContextProvider } from "./context/AuthContext";
import AboutPage from "./components/AboutPage/AboutPage";
import ReactGA from "react-ga4";
import { useEffect } from "react";

ReactGA.initialize("G-7TSV14ZJ11");
function App() {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: "Home",
    });
  }, []);

  return (
    <AuthContextProvider>
      <ChakraProvider>
        <div className="App">
          <Routes>
            <Route path="/update" element={<UpdatePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </div>
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default App;
