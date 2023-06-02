import React, {useState} from "react";
import './settings.css'
import {useNavigate} from "react-router-dom";
import {logOut, setUserDetails} from "../../../DataAccess/users";

function Settings({navDisplayName, setNavDisplayName, navProfilePic, setNavProfilePic}) {

    const navigate = useNavigate();

    // selected temporary picture.
    const [newProfilePic, setNewProfilePic] = useState(null);

    const handleProfilePicChange = function (event) {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            setNewProfilePic(e.target.result);
        }
        reader.readAsDataURL(selectedFile);
    }

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        const curUsername = localStorage.getItem('username');

        const newName = document.getElementById('display-name-change').value;

        // Picture changed?
        if (newProfilePic) {
            if(await setUserDetails(curUsername, newProfilePic, null) === 'error'){
                alert("Error in saving your settings. Perhaps our server does not currently support this action.");
                return;
            }
            // set global variable.
            setNavProfilePic(newProfilePic);
            localStorage.setItem('profilePic', newProfilePic)

        }
        // Display name changed?
        if (newName !== "") {
            if(await setUserDetails(curUsername, null, newName) === 'error'){
                alert("Error in saving your settings. Perhaps our server does not currently support this action.");
                return;
            }
            // set global variable.
            setNavDisplayName(newName);
            localStorage.setItem('displayName', newName);
        }

        // Reset fields.
        document.getElementById('display-name-change').value = '';
        setNewProfilePic(null);

    };

    const handleCancel = () => {
        setNewProfilePic(null);
        document.getElementById('display-name-change').value = '';
    }

    const handleLogOut = function () {
        logOut();
        navigate('/');
    }


    return (
        <div
            className="modal fade"
            id="settingsModal"
            tabIndex={-1}
            aria-labelledby="settingsModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="settingsModalLabel">
                            ⚙️ Settings
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <form>
                        <div className="modal-body">
                            <div>
                                <label>
                                    Change display name or profile picture.
                                    <br/>
                                    <br/>
                                </label>
                            </div>
                            <label htmlFor="profile-pic-change">
                                <img src={newProfilePic || navProfilePic} id="profile-pic-clickable" alt="pp"/>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                id="profile-pic-change"
                                onChange={handleProfilePicChange}

                            />
                            <input
                                type="text"
                                placeholder={navDisplayName}
                                maxLength={15}
                                id="display-name-change"

                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" id="log-out" onClick={handleLogOut}
                                    data-bs-dismiss="modal">
                                Log out
                            </button>
                            <div className="ms-auto">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    data-bs-dismiss="modal"
                                    className="btn btn-light"
                                    id="close-btn"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSaveChanges}
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Settings;