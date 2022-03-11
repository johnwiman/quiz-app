import React, { useEffect, useState } from "react";
import "./styles.css";
import Questions from "./components/Questions";

function App() {
  //set state of the game
  const [startQuiz, setStartQuiz] = useState(true);

  //set the questions data state as an empty array
  const [questions, setQuestions] = useState([]);

  //call useEffect in order to fetch data from the API
  // setQuestions = the response of the data then drill down into results array
  useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=5";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }, []);

  // the way data is returned from this array is funny with a string for correct
  //answers and an array for incorrect answers. We need to shuffle these two together
  // so it is not immediately obvious which answer is correct
  function shuffle(array) {
    let answerArray = array;
    let currentIndex = answerArray.length;
    let tempIndex;

    while (currentIndex !== 0) {
      tempIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [answerArray[currentIndex], answerArray[tempIndex]] = [
        answerArray[tempIndex],
        answerArray[currentIndex],
      ];
    }
    return answerArray;
  }

  //we will now first print out all the questions from our "questions data" array
  // we will create our own custom Question component that will take a question
  //and an answers array and the correct answer as properties of the component
  const questionElements = questions.map((question) => (
    <Questions
      key={question.question}
      question={question.question}
      allAnswers={shuffle(
        question.incorrect_answers.concat(question.correct_answer)
      )}
      correct={question.correct_answer}
    ></Questions>
  ));

  //this is our functions that will begin the quiz from the home screen
  //will toggle boolean
  function beginQuiz() {
    setStartQuiz((prevVal) => !prevVal);
  }

  //this is the code for what we are printing to the screen from the App component
  //here we are conditionally renderering the homescreen if beginQuiz = true
  // (probably should change this so it would show screen if false, oh well for now)

  // from home screen we are printing a button that will start the quiz and change
  //state of our game

  //once we begin the game we are rendering our questions elements onto the screen
  return (
    <div className="app-container">
      {startQuiz ? (
        <div className="start-page">
          <h1>Quiz App</h1>
          <button onClick={beginQuiz} className="button">
            Start Quiz
          </button>
        </div>
      ) : (
        <div>
          <h1>Questions Page</h1>
          <br></br>
          <br></br>
          {questionElements}
          <button className="button">Check Answers</button>
        </div>
      )}
    </div>
  );
}

export default App;
