import React from 'react';
import './App.scss';
import icon from './assets/logo512.png';

export interface IAppProps {}

function App(props: IAppProps) {
  return (
    <>
      <div className="icon">
        <img src={icon} alt="react" />
      </div>
      <h1>React Template</h1>
    </>
  );
}

export default App;
