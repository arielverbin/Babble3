import {deleteContact} from "../../../DataAccess/contacts";
import io from "socket.io-client";
const socket = io.connect("localhost:5001");


function RemoveContact({focusedContact, id, setDisplayedContacts, setFocusedContact}) {

    const handleDelete = function () {
        if(window.confirm("Please note that this action cannot be undone. Press OK to delete.")){
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
        socket.emit("send_message");
    }

    return (
        <button
            id='delete-chat'
            onClick={handleDelete}
        />
    );
}

export default RemoveContact;