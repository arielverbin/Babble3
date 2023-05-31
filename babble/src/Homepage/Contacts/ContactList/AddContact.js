import {useRef} from "react";
import './addContact.css'
import {createChat} from '../../../userData.js'
import {addContact} from "../../../DataAccess/contacts";

function AddContact({setDisplayedContacts, displayedContacts}) {

    const contactBox = useRef(null);

    const handleAddContact = async function () {
        const username = contactBox.current.value.trim().toLowerCase();

        if (displayedContacts.hasOwnProperty(username)) {
            alert('The username "' + username + '" already exists in your contacts.');
            return;
        }

        createChat(username, localStorage.getItem('username')); //create a new chat with the inputted contact.

        const rawContact = await addContact(username);
        if(typeof rawContact === 'string') {
            alert(rawContact);
            return;
        }

        // new contact data.
        const newContact = {
            [username]: {
                name: rawContact.name, lastMes: "This conversation is new.", pic: rawContact.pic,
                timeChatted: "", unreads: 0, focus: false, id: rawContact.id
            }
        };

        // append new contact to list.
        setDisplayedContacts(displayedContacts => ({
            ...newContact,
            ...displayedContacts
        }));
    }

    // support adding contact via pressing enter,
    const handleEnter = function (event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault(); // Prevent form submission
            const addBtn = document.getElementById("add-contact-btn");
            addBtn.click();
        }
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-light"
                id="add-contact"
                data-bs-toggle="modal"
                data-bs-target="#newContactModal"
            />

            {/*New contact modal - hidden*/}
            <div
                className="modal fade"
                id="newContactModal"
                tabIndex={-1}
                aria-labelledby="newContactModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="newContactModalLabel">
                                Add new Contact
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Contact's Username"
                                ref={contactBox}
                                onKeyDown={handleEnter}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={() => {
                                    contactBox.current.value = ""
                                }}
                                className="btn btn-light"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                id="add-contact-btn"
                                onClick={() => {
                                    handleAddContact();
                                    contactBox.current.value = "";
                                }}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddContact;