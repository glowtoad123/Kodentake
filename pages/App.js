import React, {useState, useEffect} from 'react'
import Components from './navbar'
import Display from './projectdisplay'
import Enter from './enter'
import Newproject from './newProject'

//import Signup, {Or, Login} from './components/enter'

function App() {
  useEffect(() => {
    const username = sessionStorage.getItem("username")
  })

  return (
    <div className="App container">
      <header className="App-header">
        {!username && <Enter />}
        <Components onClick={alterPage} />
        {/*{page === "takes" && <Display />}
        <button onClick={toNewProjectPage} className="newProject" name="newProject">Create New Project</button>*/}
        {/*<Display />*/}
      </header>
      <div style={{
        backgroundColor: "white",
        borderRadius: "5px",
        display: "inline",
        margin: 'auto',
      }}>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}

export default App;
