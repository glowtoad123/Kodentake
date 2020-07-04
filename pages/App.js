import React, {useState} from 'react';
import logo from './logo.svg';
import Components from './components/navbar'
import Display from './components/projectdisplay'
import './styles.css';
import Enter from './components/enter'
import Newproject from './components/newProject'
//import Signup, {Or, Login} from './components/enter'

function App() {

  const [page, setPage] = useState("")
  const [cp, setCp] = useState(true)

  function alterPage(){
    setPage(sessionStorage.getItem("page"))
  }

  function toNewProjectPage(){
    setCp((current) => {return !current})
  }
  console.log(cp)
  console.log(page)

  const username = sessionStorage.getItem("username")

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
