import React from 'react';
import {BottomNav} from './components/BottomNav';
import {Categories} from './components/Categories';
import {Cart} from './components/Cart';
import {Profile} from './components/Profile';
import {Home} from './components/Home';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/profile" component={Profile}/>
      </Switch>
      <BottomNav />
      </div>
    </Router>
  );
}

export default App;
