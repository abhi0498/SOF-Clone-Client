import React from 'react';
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div className='container mt-5'>
            <h1>Home</h1>
            <p>Welcome to my site. Here I  have tried to recreate the most basic version on stack overflow.You can visit the questions page after you are logged in.</p>
            <Link to='/questions'>Questions</Link>
            <p>Link to my github - <a href="https://github.com/abhi0498" target='_blank'>Github</a></p>

        </div>
    );
}

export default Home;
