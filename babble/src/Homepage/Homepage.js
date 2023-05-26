import {useNavigate} from "react-router-dom";
import './homepage.css';
import {useEffect, useState} from "react";

function Homepage() {

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));

    useEffect(() => {
        localStorage.setItem('loggedIn', loggedIn);
    }, [loggedIn])
    const handleNavigate = function () {
        if (loggedIn === 'true') {
            navigate('/babble');
        } else {
            navigate('/login');
        }
    };

    const handleLogIn = function () {
        navigate('/login');
    }

    const handleLogOut = function () {
        setLoggedIn('false');
    }
    const handleSignUp = function () {
        navigate('/register');
    }

    return (<div id="homepage-container">
        <div className="homepage-pic">
        </div>
        <div id="welcome-container">
            <div className="homepage-logo"></div>
            <div>
                {!loggedIn || loggedIn === 'false' ? (<h1 id="welcome">WELCOME TO BABBLE</h1>) : (
                    <h1 id="welcome">WELCOME BACK, {localStorage.getItem('displayName').toUpperCase()}</h1>)}
            </div>
            <p id="description">Exchange ideas, express your thoughts, and forge new relationships.Start babbling
                now!</p>
            <div>
                <button
                    id="start-chatting"
                    className="btn btn-primary"
                    onClick={handleNavigate}>
                    START CHATTING
                </button>
                <br/>
                {loggedIn === 'true' ? (
                    <button
                        id="log-out-button"
                        onClick={handleLogOut}>
                        LOG OUT
                    </button>
                ) : (<>
                        <button
                            id="log-out-button"
                            onClick={handleLogIn}>
                            LOG IN
                        </button>
                        <label id="log">{'\u00A0'}{'\u00A0'}|{'\u00A0'}{'\u00A0'}</label>
                        <button
                            id="log-out-button"
                            onClick={handleSignUp}>
                            SIGN UP
                        </button>
                    </>
                )}
            </div>
        </div>
    </div>);
}

export default Homepage;