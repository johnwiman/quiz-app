import React from "react";

export default function Answers(props) {
  //here we create some conditional styling that depends on the state of our
  // "selected" property

  const styles = {
    backgroundColor: props.selected ? "#D6DBF5" : "white",
    color: props.selected ? "#293264" : "black",
    border: props.selected ? "2px solid #f5f7fb" : "2px solid #293264",
  };

  //the Answers component renders as a div with conditional styling and the ability
  //to be clicked. Clicking any of these elements on screen will send activate the
  //handleSelect function defined on Question component, and pass in props.option
  // as the arguemnt to the function. !!!!props.option resolves to an individual elements
  //"choice" attribute (defined in Question component). this is important to understand
  // as it is this property that tells that function which element was clicked

  //each one of the Answer components ultimately resolves to rendering the props.option
  //property (the choice defined by the data object)
  return (
    <div
      className="answer-elements"
      style={styles}
      onClick={() => props.handleSelect(props.option)}
    >
      {props.option}
    </div>
  );
}
