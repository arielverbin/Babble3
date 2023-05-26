import LeftSide from '../LeftSide/LeftSide';
import './LoginPage.css'
import {Link, useNavigate} from 'react-router-dom'
import {useRef} from 'react';


function LoginPage() {

    const navigate = useNavigate();

    const username = useRef(null);
    const password = useRef(null);

    const handleSubmit = (event) => {
        // Array of users.
        const storedData = localStorage.getItem('users');
        const usersArray = storedData ? JSON.parse(storedData) : [];

        const foundUser = usersArray.find(user => user.username === username.current.value &&
            user.password === password.current.value);

        if (!foundUser) {
            event.preventDefault();
            alert("Username or password does not match.");
            return;
        }

        localStorage.setItem('username', foundUser.username);
        localStorage.setItem('displayName', foundUser.displayName);
        localStorage.setItem('profilePic', foundUser.selectedImage);
        localStorage.setItem('password', foundUser.password);

        // Success! Logging in...
        localStorage.setItem('loggedIn', 'true');
        navigate('/babble');
    }

    return (
        <div className="registration">
            {/* Website Icon */}
            <div id="login-icon"></div>

            {/* Right side of the page */}
            <div className="login-right-container">
                <form className="text-center" id="login-form">
                    <h1>Log into your account.</h1>

                    <div className="login-input-container input-less-space">
                        <label className="input-icon">👤</label>
                        <input type="text" placeholder="Username" autoCorrect="off" autoCapitalize="off"
                               spellCheck="false"
                               required className="form-control login-input"
                               ref={username}
                        />
                    </div>

                    <div className="login-input-container input-less-space">
                        <label className="input-icon">🔑</label>
                        <input type="password" placeholder="Password" autoCorrect="off" autoCapitalize="off"
                               spellCheck="false" required className="form-control login-input"
                               ref={password}
                        />
                    </div>

                    <div>
                        <button className="btn btn-primary login-btn" type="submit" onClick={handleSubmit}>Log In
                        </button>
                    </div>

                    <label>Not registered? <Link to="/register">Click here</Link> to register.</label>

                </form>
            </div>


            {/* Left side of the page */}
            <LeftSide/>


        </div>

    );
}

export default LoginPage;