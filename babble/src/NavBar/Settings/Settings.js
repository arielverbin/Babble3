import React, { useState } from "react";
import './settings.css'
import { setDisplayName, setProfilePic } from '../../userData.js';

function Settings({ navDisplayName, setNavDisplayName, navProfilePic, setNavProfilePic }) {
    const [newProfilePic, setNewProfilePic] = useState(null);

    const handleProfilePicChange = (event) => {
        setNewProfilePic(URL.createObjectURL(event.target.files[0]));
    };

    const handleSaveChanges = (event) => {
        event.preventDefault();
        if (newProfilePic) {
            setNavProfilePic(newProfilePic);
            setProfilePic(newProfilePic); // set global variable.
        }
        if (document.getElementById('display-name-change').value !== "") {
            setNavDisplayName(document.getElementById('display-name-change').value);
            setDisplayName(document.getElementById('display-name-change').value); // set global variable.
        }

        // Reset fields.
        document.getElementById('display-name-change').value = '';
        setNewProfilePic(null);

    };

    const handleCancel = () => {
        setNewProfilePic(null);
        document.getElementById('display-name-change').value = '';
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
                            Settings
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
                                    <br />
                                    <br />
                                </label>
                            </div>
                            <label htmlFor="profile-pic-change">
                                <img src={newProfilePic || navProfilePic} id="profile-pic-clickable"  alt={""}/>
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
                                maxLength={30}
                                id="display-name-change"
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" id="log-out">
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