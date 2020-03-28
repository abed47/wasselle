import React from 'react';
import {BottomNav} from './components/BottomNav';
import {Categories} from './components/Categories';
import {Cart} from './components/Cart';
import {Profile} from './components/Profile';
import {Home} from './components/Home';
import {TopBar} from './components/TopBar';
import {MainContextProvider} from './context';
import {Category} from './components/Category';
import {CheckOutPage} from './components/CheckOutPage'
import {OrderHistory} from './components/OrderHistory'
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <MainContextProvider>
        <div className="App">
          <TopBar/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/categories" component={Categories}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/category/:id" component={Category} />
                <Route path="/checkout" component={CheckOutPage}/>
                <Route path="/orderHistory/:id" component={OrderHistory}/>
            </Switch>
          <BottomNav />
        </div>
      </MainContextProvider>
    </Router>
  );
}

export default App;
