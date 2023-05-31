import './App.css';
import Chat from './Chats/Chat';
import {useEffect, useState} from 'react'
import ContactList from './Contacts/ContactList/ContactList';
import NavBar from './NavBar/NavBar';
import {useNavigate} from "react-router-dom";
import {getContacts} from "../DataAccess/contacts";
import {getMessages} from "../DataAccess/chats";
import {logOut} from "../DataAccess/users";

function Babble() {

    const navigate = useNavigate();

    // Block entrance without logging in - return to landing page.
    useEffect(() => {
        if (!localStorage.getItem('JWT')) {
            navigate('/');
        }
    });

    // current open chat, current focused contact, current displayed contacts.
    const [focusedContact, setFocusedContact] = useState("");
    const [displayedContacts, setDisplayedContacts] = useState({});
    const [curChat, setCurChat] = useState(undefined);

    // Init contact list with the contact list from the server.
    useEffect(() => {
        const initContacts = async () => {
            const contacts = await getContacts();
            if(contacts === 'An error occurred, please try again.') {
                await alert("We encountered a problem fetching your data...");
                logOut();
                window.location.reload();
                navigate('/');
                return;
            }
            setDisplayedContacts(contacts);
        };
        initContacts();
    }, []);

    // Init current chat messages.
    useEffect(() => {
        const initChat = async () => {
            const messages = await getMessages(displayedContacts[focusedContact].id);
            if(messages === 'An error occurred, please try again.') {
                alert("We encountered a problem fetching your data...");
                logOut();
                window.location.reload();
                navigate('/');
                return;
            }
            setCurChat(messages);
        };
        if(displayedContacts[focusedContact]) {
            initChat();
        } else {
            setCurChat(undefined);
        }
    }, [focusedContact]);

    return (
        <div id="homepage">
            <NavBar/>
            <ContactList
                displayedContacts={displayedContacts}
                setDisplayedContacts={setDisplayedContacts}
                focusedContact={focusedContact}
                setFocusedContact={setFocusedContact}
            />

            <Chat
                contact={displayedContacts[focusedContact]}
                contacts={displayedContacts}
                setContacts={setDisplayedContacts}
                chat={curChat}
                setCurChat={setCurChat}
            />
        </div>
    );
}

export default Babble;
