import './App.css';

import React from 'react';
import bell from './bell.mp3'
import logo from './logo.svg';

function App() {
  function play() {
    var audio = new Audio(bell)
    audio.play();
  }
  
  
  function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          tag: 'vibration-sample'
        });
      });
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          if ('Notification' in window) {
            navigator.serviceWorker.ready.then(registration => {
              registration.showNotification('Vibration Sample', {
                body: 'Buzz! Buzz!',
                tag: 'vibration-sample'
              });
            });
          }
      }
    })
  }
}
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => {play()}}>Instant</button>
        <button onClick={() => {setInterval(play, 5000)}}>Delay</button>
      </header>
    </div>
  );
}

export default App;
