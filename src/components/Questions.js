import React from "react";
import { useState } from "react";
import "../styles.css";
import Answers from "./Answers";

//in the Questions component we must receive props to access our other state
//variable we passed down from the App component (question, allAnswers, correctAnswer)
export default function Questions(props) {
  //to begin we must restructure our data we are getting from the app component into
  //an array of objects. This is because we get a question, an array of all possible
  //answers, and a correct answer string.

  //wer first create a new array to hold our objects. we then take in our answers array
  //as passed down as props and loop through it. The goal here is to map the correct
  //answer to the index of the correct answer in the allAnswers array. to do this we
  //check if the answer at each element is equal to the correct answer, if so we
  //push an object with the choice and is correct as "true" and create a "selected"
  //option that we can use later. If they don't match, we push the object with the
  //isCorrect and set it equal to false
  const answerObject = [];

  for (let i = 0; i < props.allAnswers.length; i++) {
    if (props.allAnswers[i] === props.correct) {
      answerObject.push({
        choice: props.allAnswers[i],
        isCorrect: true,
        selected: false,
      });
    } else {
      answerObject.push({
        choice: props.allAnswers[i],
        isCorrect: false,
        selected: false,
      });
    }
  }

  //we can now initialize state of the answers equal to the new answerObject array
  //that we created from above
  const [answers, setAnswers] = useState(answerObject);

  //we generate a function that will change the value of our answers "selected"
  //attribute when clicked. to do this we take in the "choice as an argument of
  //this function (comes from our answers object). From here we use the "setAnswers"
  //function to change the state of the clicked on element. to do this we map
  //over all previous values and check if the choice being return from the click
  //event is equal to the choice of the item being selected, and if so we change
  // the selected property on that element. (!!! we must spread the rest of the
  // object into this as well)
  function handleSelect(choice) {
    setAnswers((prevVal) => {
      return prevVal.map((answer) => {
        return answer.choice === choice
          ? { ...answer, selected: !answer.selected }
          : answer;
      });
    });
  }
  console.log(answers);

  //we map over the answers array and generate our own custom Answer components
  //for each "answer" in that array. We assign properties of option, selected,
  // and the function "handleSelect" down to each of the rendered Answer components
  const answerElements = answers.map((selection) => (
    <Answers
      option={selection.choice}
      key={selection.choice}
      selected={selection.selected}
      handleSelect={handleSelect}
    ></Answers>
  ));
  //we now render our question and our entire list of possible answers (answerelements)
  //onto the page
  return (
    <div>
      <h4>{props.question}</h4>

      <div className="answer-container">{answerElements}</div>
      <div></div>
    </div>
  );
}
