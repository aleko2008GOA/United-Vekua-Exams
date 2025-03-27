import { Link } from 'react-router-dom';
import './Header.css';

function Header(){
    return (
        <nav>
            <Link to='/sign-in'>
                <button>Sign In</button>
            </Link>
            <Link to='/sign-up'>
                <button>Sign Up</button>
            </Link>
        </nav>
    )
}

export default Header;