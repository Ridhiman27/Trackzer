import "./App.css";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/NoteState";
//Switch is depreciated in the version-6 of the router dom. So install version-5
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const[alert,setAlert] = useState(null);
    const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type,
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  };
  
  return (
    <div className="App">
    {/* Wrapping everything the NoteState so that all the components and sub components can access the states through context api */}

      <NoteState>
        <Router>
          <Navbar />
          <Alert alert = {alert}/>
          <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path="/about">
              <About/>
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert}/>
            </Route>
            <Route exact path="/signup">
              <Signup showAlert={showAlert}/>
            </Route>
          </Switch>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
