import React, { useContext } from 'react';
import AuthContext from "../context/auth-context";
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const context = useContext(AuthContext)
    return (
        < >
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="navbar-brand">SF CLone</div>

                <div className="navbar-nav ml-sm-auto">
                    {context.token && (<li className="nav-item nav-link"><NavLink to='/questions'>Questions</NavLink></li>)}
                    {!context.token && (<li className="nav-item nav-link"><NavLink to='/auth'>Login</NavLink></li>)}

                </div>
            </nav>

        </>
    );
}

export default Navbar;
