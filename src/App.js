import React, { useState } from 'react';
import './css/bootstrap.min.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthPage from './pages/Auth'
import HomePage from './pages/Home'
import QuestionsPage from './pages/Questions'
import Navbar from './components/Navbar';

import AuthContext from "./context/auth-context";



function App() {
  const [token, settoken] = useState(null);
  const [userID, setuserID] = useState(null);
  const login = (token, userID, tokenExpiration) => {
    settoken(token)
    setuserID(userID)

  }
  const logout = () => {
    settoken(null)
    setuserID(null)
  }

  return (
    <BrowserRouter>
      <>
        <AuthContext.Provider value={{ token: token, userID: userID, login: login, logout: logout }}>
          <Navbar />
          <Switch>
            {!token && (<Redirect from='/' to='/auth' component={HomePage} exact />)}
            {token && (<Redirect from='/' to='/questions' component={HomePage} exact />)}
            {token && (<Redirect from='/auth' to='/questions' component={HomePage} exact />)}


            {!token && (<Route path='/auth' component={AuthPage} />)}
            <Route path='/questions' component={QuestionsPage} />
          </Switch>
        </AuthContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
