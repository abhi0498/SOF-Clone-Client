import React, { useState, useEffect } from 'react';
import './css/bootstrap.min.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthPage from './pages/Auth'
import HomePage from './pages/Home'
import QuestionsPage from './pages/Questions'
import AskQuestion from './pages/AddQuestion'
import Question from './pages/Question'


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
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('tokenExpiration')
    sessionStorage.removeItem('userID')

  }
  useEffect(() => {

    if (sessionStorage.getItem('token')) {
      login(sessionStorage.getItem('token'), sessionStorage.getItem('userID'), sessionStorage.getItem('tokenExpiration'))

    }

  }, [])

  return (
    <BrowserRouter>
      <>
        <AuthContext.Provider value={{
          token: token, userID: userID, login: login, logout: logout, API: 'https://sof-clone.herokuapp.com/graphql'
        }}>
          <Navbar />
          <Switch>

            {!token && (<Route path='/auth' component={AuthPage} exact />)}


            {token && (<Redirect from='/auth' to='/questions' component={QuestionsPage} exact />)}
            {!token && (<Redirect from='/questions' to='/auth' component={AuthPage} />)}
            <Route path='/questions' component={QuestionsPage} exact />
            <Route path='/questions/ask' component={AskQuestion} exact />
            <Route path='/questions/:id' component={Question} exact />

            <Route path='/' component={
              HomePage
            } />

          </Switch>
        </AuthContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
