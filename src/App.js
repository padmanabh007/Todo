import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Todo from './Components/Todo';


function App() {

  
  return (
    <div className="App">
      {/*<Router>
        <Link exact to='/'>Login</Link>
        <Link to='/signUp'>SignUp</Link>
        <Switch>
          <Route path='/signUp'> <SignUp/> </Route>
          <Route path='/'><Login/></Route>
        </Switch>
      </Router>*/}
      <Todo/>
    </div>
  );
}

export default App;
