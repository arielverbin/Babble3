import {deleteContact} from "../../../DataAccess/contacts";
import {socket} from "../../Babble";

function RemoveContact({focusedContact, id, setDisplayedContacts, setFocusedContact}) {

    const handleDelete = async function () {
        if (window.confirm("Please note that this action cannot be undone. Press OK to delete.")) {
            await deleteContact(id);
            setFocusedContact("");
            setDisplayedContacts(
                (displayedContacts) => {
                    const newContacts = {...displayedContacts};
                    delete newContacts[focusedContact];
                    return newContacts;
                });
            if (socket) {
                socket.emit('remove-chat', focusedContact);
            }
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