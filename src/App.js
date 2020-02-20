import React from 'react';
import './App.css';
import DatePicker from "./components/Datepicker/index";

function App(props) {

  return (
    <DatePicker options={props.options} />
  );
}

export default App;
