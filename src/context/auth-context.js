import React from 'react'

export default React.createContext({
    token: null,
    userID: null,
    API: 'http://localhost:5000/graphql',
    login: () => { },
    logout: () => { }
})