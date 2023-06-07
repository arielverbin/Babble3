import React, {useEffect, useState} from 'react';
import './navBar.css';
import Settings from './Settings/Settings';
import {useNavigate} from "react-router-dom";

import soundOnIcon from "./sound-on.svg";
import soundOffIcon from "./sound-off.svg";

function NavBar() {

    const navigate = useNavigate();

    // selected sound setting.
    const [soundSetting, setSoundSetting] = useState(true);

    useEffect(() => {
        localStorage.setItem('sound-setting', String(soundSetting));
    }, [soundSetting])


    const handleHomepage = function () {
        navigate('..');
    }

    const storedPic = localStorage.getItem('profilePic');
    const storedName = localStorage.getItem('displayName');

    const [navProfilePic, setNavProfilePic] = useState(storedPic);
    const [navDisplayName, setNavDisplayName] = useState(storedName);

    return (
        <>
            <nav id="babble-nav">
                <img src="../../favicon.ico" id="logo" alt="logo" onClick={handleHomepage}/>

                <button onClick={() => {setSoundSetting(!soundSetting)}} id="sound-setting">
                    <img
                        src={(soundSetting) ? soundOnIcon : soundOffIcon}
                        alt="Sound Icon"
                    />
                </button>

                <button
                    type="button"
                    className="btn btn-outline-light"
                    id="settings"
                    data-bs-toggle="modal"
                    data-bs-target="#settingsModal"
                />
                <img src={navProfilePic} className="profile-pic" alt="pp"/>
                <label className="display-name">{navDisplayName}</label>

            </nav>

            <Settings navProfilePic={navProfilePic} setNavProfilePic={setNavProfilePic}
                      navDisplayName={navDisplayName} setNavDisplayName={setNavDisplayName}
            />

        </>
    );
}

export default NavBar;