import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Main from "./components/Main"
import Error from "./components/error"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/:id' component={Main} />
        <Route component={Error} />
      </Switch>
    </Router>
  )
}

export default App
