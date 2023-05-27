import {useNavigate} from "react-router-dom";
import './homepage.css';
import {useEffect, useState} from "react";
import {logOut, setUserJWT, userJWT} from "../DataAccess/users";

function Homepage() {

    const navigate = useNavigate();

    const [jwt, setJwt] = useState(userJWT);

    useEffect(() => {
        setUserJWT(jwt);
    }, [jwt])

    const handleNavigate = function () {
        if (jwt) {
            navigate('/babble');
        } else {
            navigate('/login');
        }
    };

    const handleLogIn = function () {
        navigate('/login');
    }

    const handleLogOut = function () {
        setJwt(null);
        logOut();
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
                {!jwt ? (<h1 id="welcome">Welcome to Babble</h1>) : (
                    <h1 id="welcome">Welcome back, {localStorage.getItem('displayName')}</h1>)}
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
                {jwt ? (
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