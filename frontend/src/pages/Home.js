import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
    const { isLoggedin, toggleLogin, toggleLogout } = useContext(AuthContext);

    console.log('Home Component Rendered');
    console.log('Is Logged in:', isLoggedin);

    return (
        <div className="home">
            <h2>Home Page</h2>
            <p>Is Logged in: { isLoggedin ? 'true' : 'false' }</p>
            <button onClick={ toggleLogin }>Login</button>
            <button onClick={ toggleLogout }>Logout</button>
        </div>
    );
}

export default Home;
