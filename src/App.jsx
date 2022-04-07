import React from 'react';
import { testFn } from './helpers'
import './App.css';

function App() {
  
  function submitForm(e) {
    e.preventDefault();
    testFn("testFn input")
    const formData = new FormData(e.target);
    
    fetch('https://flask-test.gundadittu.repl.co/upload-face-image', {
      method: 'post',
      body: formData
    })
    .then((r) => r.json())
    .then((json) => {
      const message = `Success.`
      alert(message);
    })
    .catch((e) => {
      console.error(e.message)
      alert(e.message)
    })
  }
  
  return (
    <form onSubmit={submitForm}>
       <input type="text" name="name" />
      <br/>
      <input type="file" name="faceImage" accept="image/png, image/jpeg"/>
      <br/>
      <input type="submit" value="Submit" />
    </form>
  );
}

// TODO: look into jsx documentation for form
// TODO: look into formdata object docs
// TODO: how to add multiple files?
export default App;

// https://reactjs.org/docs/dom-elements.html
// https://reactjs.org/docs/events.html'
// https://reactjs.org/docs/uncontrolled-components.html
// https://reactjs.org/docs/forms.html
// https://reactjs.org/docs/jsx-in-depth.html
// https://reactjs.org/docs/refs-and-the-dom.html
// https://reactjs.org/docs/thinking-in-react.html