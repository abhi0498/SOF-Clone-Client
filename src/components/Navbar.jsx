import React, { useContext } from 'react';
import AuthContext from "../context/auth-context";
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
    const context = useContext(AuthContext)
    return (
        < >
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <Link to='/' className="navbar-brand">SF CLone</Link>

                <div className="navbar-nav ml-sm-auto">
                    {context.token && (<li className="nav-item nav-link"><NavLink to='/questions'>Questions</NavLink></li>)}

                    {!context.token && (<li className="nav-item nav-link"><NavLink to='/auth'>Login</NavLink></li>)}
                    {context.token && (<li onClick={context.logout} className="nav-item nav-link"><NavLink to='/auth'>Logout</NavLink></li>)}

                </div>
            </nav>

        </>
    );
}

export default Navbar;
