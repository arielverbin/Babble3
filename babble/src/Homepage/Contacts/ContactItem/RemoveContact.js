import { deleteChat } from '../../../userData'

function RemoveContact({focusedContact, setDisplayedContacts, setFocusedContact}) {

    const handleDelete = function () {
        if(window.confirm("Please note that this action cannot be undone. Press OK to delete.")){
            deleteChat(focusedContact, localStorage.getItem('username'));
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