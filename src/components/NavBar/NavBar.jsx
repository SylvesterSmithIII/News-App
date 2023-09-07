import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav>
            <Link to="/" >Home</Link>
            &nbsp; | &nbsp;
            { user && 
            <>
                <Link to="/weather" >Weather</Link>
                &nbsp; | &nbsp;
                <Link to="/search" >Search</Link>
                &nbsp;&nbsp;
                <Link to="/saved" >Saved</Link>
                &nbsp;&nbsp;
                <Link to="/settings" >Settings</Link>
                &nbsp;&nbsp;
                <span>Welcome, {user.name}</span>
                &nbsp;&nbsp;
            </>
            }
            { 
                user
                ?
                <Link to="" onClick={handleLogOut} >Log Out</Link>
                :
                <Link to="/auth">Login</Link>
            }
        </nav>
    )
}