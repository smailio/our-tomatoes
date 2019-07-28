import React from "react";
import "./App.css";
import "./initFirebase.js";
import Auth from "./components/Auth";
import { connect } from "react-redux";
import Hello from "./components/Hello";

function App({ isConnected }) {
  return isConnected ? <Hello /> : <Auth />;
}

const AppContainer = connect(state => ({
  isConnected: state.user.isConnected
}))(App);

export default AppContainer;
