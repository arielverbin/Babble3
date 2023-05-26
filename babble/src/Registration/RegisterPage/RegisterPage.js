import LeftSide from '../LeftSide/LeftSide';
import './RegisterPage.css';
import {Link, useNavigate} from 'react-router-dom';
import {useRef, useState} from 'react';

function RegisterPage() {

    const navigate = useNavigate();

    // References to input boxes.
    const username = useRef(null);
    const displayName = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);

    const [selectedPic, setSelectedPic] = useState(null);

    const handleChangePicture = function (event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setSelectedPic(e.target.result);
            }
            reader.readAsDataURL(selectedFile);
        } else {
            setSelectedPic(null);
        }
    }

    // Validation errors.
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handlePasswordChange = () => {
        if (password.current.value.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else if (!/\d/.test(password.current.value)) {
            setPasswordError('Password must contain at least one digit');
        } else if (!/[A-Z]/.test(password.current.value)) {
            setPasswordError('Password must contain at least one uppercase letter');
        } else if (/\s/.test(password.current.value)) {
            setPasswordError('Password must not contain spaces');
        } else {
            // No error.
            setPasswordError('');
            password.current.style.borderColor = 'rgb(25,162,4)';
            return;
        }
        password.current.style.borderColor = 'red';
    };

    const handleConfirmPasswordChange = () => {
        if (confirmPassword.current.value !== password.current.value) {
            setConfirmPasswordError('Passwords do not match');
            confirmPassword.current.style.borderColor = 'red';
        } else {
            setConfirmPasswordError('');
            if (passwordError === "") {
                confirmPassword.current.style.borderColor = 'rgb(25,162,4)';
            } else {
                confirmPassword.current.style.borderColor = 'grey'
            }
        }
    };

    const handleChangeUsername = () => {
        const user = username.current.value.trim().toLowerCase();
        username.current.value = user;

        // username already exists?
        const storedData = localStorage.getItem('users');
        const usersArray = storedData ? JSON.parse(storedData) : [];

        if (usersArray.find(user => user.username === username.current.value)) {
            username.current.style.borderColor = 'red';
            setUsernameError("Username already exists.");
            return;
        }

        if (/^[a-z0-9._]+$/.test(user)) {
            username.current.style.borderColor = 'rgb(25,162,4)';
            setUsernameError('');
        } else {
            if (user === "") {
                username.current.style.borderColor = 'grey';
                setUsernameError('');
                return;
            }
            username.current.style.borderColor = 'red';
            setUsernameError("Only [a-z], [0-9], '.', and '_' are allowed.");
        }
    }

    const handleSubmit = (event) => {
        if (username.current.value !== ""
            && displayName.current.value !== ""
            && selectedPic !== null
            && password.current.value !== ""
            && confirmPassword.current.value !== "") {

            if (passwordError !== '') {
                event.preventDefault();
                alert(passwordError);
            } else if (password.current.value !== confirmPassword.current.value) {
                event.preventDefault();
                alert(confirmPasswordError);
            } else if (usernameError !== "") {
                event.preventDefault();
                alert(usernameError);
            } else {

                // Store user's data.
                localStorage.setItem('username', username.current.value);
                localStorage.setItem('password', password.current.value);
                localStorage.setItem('displayName', displayName.current.value);
                localStorage.setItem('profilePic', selectedPic);
                // Add new user to array of all users.
                const storedData = localStorage.getItem('users');
                const usersArray = storedData ? JSON.parse(storedData) : [];
                usersArray.push({
                    'username': username.current.value,
                    'displayName': displayName.current.value,
                    'selectedImage': selectedPic,
                    'password': password.current.value
                });
                localStorage.setItem('users', JSON.stringify(usersArray));
                // Success! Logging in...
                localStorage.setItem('loggedIn', 'true');
                navigate('/babble');
            }
        }
    }

    return (
        <div className="registration">
            {/* Website Icon */}
            <div id="reg-icon"></div>

            {/* Right side of the page */}
            <div className="reg-right-container" id="register">
                <form className="text-center reg-form">
                    <h1>Create a new account.</h1>

                    {username && <div className="error-message">{usernameError}</div>}
                    <div className="reg-input-container input-less-space">
                        <label className="input-icon">👤</label>
                        <input
                            type="text"
                            placeholder="Username"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            maxLength="15"
                            required
                            className="form-control reg-input"
                            ref={username}
                            onChange={handleChangeUsername}
                        />
                    </div>

                    <div className="reg-input-container">
                        <label className="input-icon">❝</label>
                        <input
                            type="text"
                            placeholder="Display Name"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            maxLength="15"
                            required
                            className="form-control reg-input"
                            ref={displayName}
                        />
                    </div>
                    {passwordError && <div className="error-message">{passwordError}</div>}
                    <div className="reg-input-container input-less-space">
                        <label className="input-icon">🔑</label>
                        <input
                            type="password"
                            placeholder="New Password"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            required
                            className="form-control reg-input"
                            ref={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                    <div className="reg-input-container">
                        <label className="input-icon">🔐</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            required
                            className="form-control reg-input"
                            ref={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>


                    <div>
                        <label>🤳 Profile Picture</label>
                    </div>
                    <div className="reg-input-container">
                        <input
                            id="select-pic"
                            type="file"
                            className="form-control reg-input"
                            accept="image/*"
                            onChange={handleChangePicture}
                            required
                        />
                    </div>

                    {/* display the chosen photo */}
                    {selectedPic && (
                        <div>
                            <img
                                id='pic-preview'
                                src={selectedPic}
                                alt="Selected"
                            />
                        </div>
                    )}

                    <div>
                        <button className="btn btn-primary register-btn" type="form" onClick={handleSubmit}>Register
                        </button>
                    </div>

                    <label>Already registered? <Link to="/login">Click here</Link> to log in.</label>

                </form>
            </div>

            {/* Left side of the page */}
            <LeftSide/>

        </div>
    );
}

export default RegisterPage;