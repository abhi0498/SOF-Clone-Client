import React, { Component } from 'react'

export default class Questions extends Component {
    componentDidMount() {
        let reqBody = {
            query: `
        query{
            questions{
                _id
                title
            }
        }`}

        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                // if (res.status !== 200 || res.status !== 201) {
                //     throw new Error("Server error")

                // }
                console.log(res)
                return res.json()
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })

    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
