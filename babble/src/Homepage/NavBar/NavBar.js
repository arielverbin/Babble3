import {useState} from 'react';
import './navBar.css';
import Settings from './Settings/Settings';
import {useNavigate} from "react-router-dom";

function NavBar() {

    const navigate = useNavigate();

    const handleHomepage = function() {
        navigate('..');
    }
    const storedPic = localStorage.getItem('profilePic');
    const storedName = localStorage.getItem('displayName');

    const [navProfilePic, setNavProfilePic] = useState(storedPic);
    const [navDisplayName, setNavDisplayName] = useState(storedName);

    return (
        <>
            <nav>
                <img src="../../favicon.ico" id="logo" alt="logo"/>
                <button
                    type="button"
                    className="btn btn-outline-light"
                    id="settings"
                    data-bs-toggle="modal"
                    data-bs-target="#settingsModal"
                    disabled // Server does not support.
                />
                <img src={navProfilePic} className="profile-pic" alt="pp"/>
                <label className="display-name">{navDisplayName}</label>

                <button id="home-btn"
                        onClick={handleHomepage}
                ></button>
            </nav>

            <Settings navProfilePic={navProfilePic} setNavProfilePic={setNavProfilePic}
                      navDisplayName={navDisplayName} setNavDisplayName={setNavDisplayName}
            />

        </>
    );
}

export default NavBar;