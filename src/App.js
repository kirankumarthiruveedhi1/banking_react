import React,{Component} from 'react';
import './App.css';
import {HashRouter,Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import AdminPage from './components/AdminPage/AdminPage';
import CreateAccount from './components/CreateAccount/CreateAccount';
import UserPage from './components/UserPage/UserPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }
  validateUser = (isLoggedIn)=> {
    this.setState({isLoggedIn})  
  }

  redirect = (page, history) => {
    history.push('/'+ page);
  }
  render(){
    return (
      <div className="container-fluid">
        <HashRouter>
          <div>
        <div><Header isLoggedIn={this.state.isLoggedIn} redirect={this.redirect}/></div><br/>
        <Switch>
              <Route path="/" component={Login} exact/>
              <Route path="/login" component={()=> <Login  validateUser={this.validateUser} />} />
              <Route path="/logout" component={Logout} />
              <Route path="/AdminPage" component={AdminPage} />
              <Route path="/UserPage" component={UserPage} />
              <Route path="/CreateAccount" component={CreateAccount} />
        </Switch>
        </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
