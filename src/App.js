import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [definition, setDef] = useState([]);
  const [display, setDisplay] = useState(false);
  const key = process.env.REACT_APP_MEDICAL_DICTIONARY;

  useEffect(() => {
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/medical/json/femur?key=${key}`
    )
      .then((resp) => resp.json())
      .then((data) => setDef(data));
  }, []);

  const shiftDisplay = () => setDisplay((prevState) => !prevState);

  return (
    <div className='App'>
      {definition.map((def) => {
        return (
          <>
            <h3>{def.meta.id.toUpperCase()}</h3>
            <ul>
              {def.shortdef.map((short) => (display ? "" : <li>{short}</li>))}
            </ul>
          </>
        );
      })}
      <button type='button' onClick={shiftDisplay}>
        Click me
      </button>
    </div>
  );
}

export default App;
