import { deleteChat } from '../../../userData'
import {deleteContact} from "../../../DataAccess/contacts";

function RemoveContact({focusedContact, id, setDisplayedContacts, setFocusedContact}) {

    const handleDelete = function () {
        if(window.confirm("Please note that this action cannot be undone. Press OK to delete.")){
            deleteChat(focusedContact, localStorage.getItem('username'));
            console.log("id: " + id);
            deleteContact(id);
            setFocusedContact("");
            setDisplayedContacts(
                (displayedContacts) => {
                    const newContacts = { ...displayedContacts };
                    delete newContacts[focusedContact];
                    return newContacts;
                });
        }
    }

    return (
        <button
            id='delete-chat'
            onClick={handleDelete}
        />
    );
}

export default RemoveContact;