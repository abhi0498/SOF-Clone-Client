import React, { useState, useContext } from 'react';
import AuthContext from '../context/auth-context'
import '../css/auth.css'

const Auth = () => {
    const [displayError, setDisplayError] = useState(false)
    const [pageState, setPageState] = useState('login')
    const [emailID, setEmailID] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [displaySuccess, setdisplaySuccess] = useState(false)

    const context = useContext(AuthContext);

    const changePageState = () => {
        if (pageState === 'login') setPageState('signup')
        else setPageState('login')
        setdisplaySuccess(false)
    }
    const login = (e) => {
        context.token = 'a'
        e.preventDefault()
        if (emailID.trim().length === 0 || password.trim().length === 0) {
            return
        }
        let reqBody = {
            query: `
        mutation{
            signUp(UserData:{email:"${emailID}",password:"${password}"})
        }`}

        if (pageState === 'login') {
            reqBody = {
                query: `
            query{
                login(UserData:{email:"${emailID}",password:"${password}"}){
                    userID
                    tokenExpiration
                    token
                }
            }`}
        }

        fetch(context.API, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                return res.json()
            })
            .then(res => {

                if (res.errors) {
                    setError(res.errors[0].message)
                    setDisplayError(true)
                    setTimeout(() => {
                        setDisplayError(false)
                    }, 3000);
                    setdisplaySuccess(false)
                }
                else {
                    setError('')
                    setDisplayError(false)
                    setdisplaySuccess(true)
                }
                if (res.data.login.token) {
                    sessionStorage.setItem('token', res.data.login.token);
                    sessionStorage.setItem('userID', res.data.login.userID);
                    sessionStorage.setItem('tokenExpiration', res.data.login.tokenExpiration);
                    context.login(res.data.login.token, res.data.login.userID, res.data.login.tokenExpiration)
                }
                console.log(res.errors);
                console.log(res);

            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            <h1>{pageState !== 'login' ? 'SignUp' : 'Login'}</h1>
            <form className='container' onSubmit={login}>
                <div className="w-50 mr-auto">
                    <div className="form-group">
                        <label htmlFor="emailID">Email address</label>
                        <input onChange={(e) => {
                            setEmailID(e.target.value)
                        }} type="email" className="form-control" id="emailID" aria-describedby="emailHelp" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => {
                            setPassword(e.target.value)
                        }} type="password" className="form-control" id="password" />
                    </div>
                    <p className={`alert alert-danger ${displayError ? '' : 'd-none'}`} role="alert">
                        {error}</p>
                    <p className={`alert alert-primary ${displaySuccess ? '' : 'd-none'}`} role="alert">
                        Successfully signed up.Please login.</p>
                    <div className="d-flex justify-content-around mt-5">
                        <button className="btn btn-primary">{pageState !== 'login' ? 'SignUp' : 'Login'}</button>
                    </div>
                    <p onClick={changePageState} >Go to {pageState === 'login' ? 'SignUp' : 'Login'} Page</p>
                </div>
            </form>



        </div >
    );
}

export default Auth;
