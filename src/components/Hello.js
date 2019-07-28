import React from "react";
import { connect } from "react-redux";

const Hello = ({ display_name }) => {
  return <h1>Hello {display_name}</h1>;
};

const HelloContainer = connect(state => ({
  display_name: state.user.display_name
}))(Hello);

export default HelloContainer;
