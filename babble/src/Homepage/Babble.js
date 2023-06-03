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
        if (localStorage.getItem('JWT') === 'undefined' ||
            localStorage.getItem('JWT') === 'null') {
            navigate('/');
        }
    });

    // current open chat, current focused contact, current displayed contacts.
    const [focusedContact, setFocusedContact] = useState("");
    const [displayedContacts, setDisplayedContacts] = useState({});
    const [curChat, setCurChat] = useState({});

    // Init current contact list.
    useEffect(() => {
        const initContacts = async () => {
            const contacts = await getContacts();
            if(contacts === 'An error occurred, please try again.') {
                console.log("We encountered a problem fetching your data...");
                //logOut();
                //navigate('/');
                return;
            }
            setDisplayedContacts(contacts);
        };
        initContacts();
    }, [navigate]);

    // Init current chat messages.
    useEffect(() => {
        const initChat = async () => {
            const messages = await getMessages(displayedContacts[focusedContact].id);
            if(messages === 'Error downloading previous messages.') {
                console.log("We encountered a problem fetching your data...");
                logOut();
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
    }, [focusedContact, displayedContacts, navigate]);

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
