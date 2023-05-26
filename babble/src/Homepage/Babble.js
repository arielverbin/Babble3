import './App.css';
import Chat from './Chats/Chat';
import {useEffect, useState} from 'react'
import ContactList from './Contacts/ContactList/ContactList';
import NavBar from './NavBar/NavBar';

import {contacts, setContacts, chats, updateChat} from '../userData'
import {useNavigate} from "react-router-dom";

function Babble() {

    const navigate = useNavigate();

    // Block entrance without logging in.
    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/');
        }
    });

    // current connected username.
    const ourUsername = localStorage.getItem('username');

    const [focusedContact, setFocusedContact] = useState("");
    // create new contact list (if username is new)
    if(!contacts[ourUsername]) {
        contacts[ourUsername] = {};
    }
    const [displayedContacts, setDisplayedContacts] = useState(contacts[ourUsername]);

    //create new chats (if username is new)
    const ourChat = chats[ourUsername];
    if(!ourChat) {
        chats[ourUsername] = {};
    }
    const [curChat, setCurChat] = useState(chats[ourUsername][focusedContact]);

    useEffect(() => {
        updateChat(curChat, focusedContact, localStorage.getItem('username'));
    }, [curChat]);

    useEffect(() => {
        setCurChat(chats[ourUsername][focusedContact]);
    }, [focusedContact])

    useEffect(() => {
        setContacts(displayedContacts, localStorage.getItem('username'));
    }, [displayedContacts]);


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
                contact={contacts[ourUsername][focusedContact]}
                chat={curChat}
                setCurChat={setCurChat}
                setFocusedContact={setFocusedContact}
                focusedContact={focusedContact}
                displayedContacts={displayedContacts}
            />
        </div>
    );
}

export default Babble;
