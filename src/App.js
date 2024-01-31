import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Characters from './components/Characters';
import Episodes from './components/Episodes';
import Locations from './components/Locations';
import CharacterDetail from './components/CharacterDetail';
import './App.css';
import EpisodeDetail from './components/EpisodeDetail';
import LocationDetail from './components/LocationDetail';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Rick & Morty Explorer</h2>
          <nav>
            <Link to="/">Home</Link> | 
            <Link to="/characters"> Characters</Link> | 
            <Link to="/episodes"> Episodes</Link> | 
            <Link to="/locations"> Locations</Link>
          </nav>
        </header>
        <Switch>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route path="/episodes">
            <Episodes />
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          <Route path="/character/:id">
            <CharacterDetail />
          </Route>
          <Route path="/episode/:id">
            <EpisodeDetail />
          </Route>
          <Route path="/location/:id">
            <LocationDetail/>
          </Route> 
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
