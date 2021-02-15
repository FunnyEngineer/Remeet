import React from 'react';
import logo from './logo.svg';
import './App.css';
import CustomizedTimeline from './pages/timeline';
import { Switch, Route, Link } from 'react-router-dom';
import ReportItemList from './pages/reportList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
  <div>
  <switch>
    <Route exact path='/' component={CustomizedTimeline} />
    <Route path='/report' component={ReportItemList} />
  </switch>
  </div>
  </DndProvider>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
