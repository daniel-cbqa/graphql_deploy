import Header from "../components/Header";
import Map from "../components/Map";
import React from "react";
import withRoot from "../withRoot";

const App = () => {
  return (
    <>
      <Header />
      <Map />
    </>
  );
};

export default withRoot(App);
