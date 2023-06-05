import './App.css';
import Chat from './Chats/Chat';
import {useEffect, useState} from 'react'
import ContactList from './Contacts/ContactList/ContactList';
import NavBar from './NavBar/NavBar';
import {useNavigate} from "react-router-dom";
import {getContacts} from "../DataAccess/contacts";
import {getMessages} from "../DataAccess/chats";
import io from "socket.io-client";

export let socket;
// establish a WebSocket connection with the server.
socket = (localStorage.getItem('JWT') &&
    localStorage.getItem('JWT') !== 'null' &&
    localStorage.getItem('JWT') !== 'undefined')
    ? io.connect("localhost:5001", {
        query: {
            username: localStorage.getItem('username')
        }
    }) : null;

export const setSocket = function (newSocket) {
    socket = newSocket;
}

function Babble() {

    const navigate = useNavigate();

    // Block entrance without logging in - return to landing page.
    useEffect(() => {
        if (!localStorage.getItem('JWT') || localStorage.getItem('JWT') === 'undefined' ||
            localStorage.getItem('JWT') === 'null') {
            navigate('/');
        }
    });

    // current open chat, current focused contact, current displayed contacts.
    const [focusedContact, setFocusedContact] = useState("");
    const [displayedContacts, setDisplayedContacts] = useState({});
    const [curChat, setCurChat] = useState({});
    const [triggerRender, setTriggerRender] = useState(1);

    // Init current contact list.
    useEffect(() => {
        const initContacts = async () => {
            console.log("Trigger: " + triggerRender);
            const contacts = await getContacts();
            if (contacts === 'An error occurred, please try again.') {
                console.log("We encountered a problem fetching your data...");
                return;
            }
            setDisplayedContacts(contacts);
        };

        initContacts();
    }, [navigate, triggerRender]);

    // Init current chat messages.
    useEffect(() => {
        const initChat = async () => {
            const messages = await getMessages(displayedContacts[focusedContact].id);
            if (messages === 'Error downloading previous messages.') {
                console.log("We encountered a problem fetching your data...");
                return;
            }
            setCurChat(messages);
        };

        if (displayedContacts[focusedContact]) {
            initChat();
        } else {
            setCurChat(undefined);
        }
    }, [focusedContact, displayedContacts, navigate]);

    // Update contact list when chat creation occurs.
    useEffect(() => {
        const handleNewChat = () => {
            setTriggerRender(1 - triggerRender);
        }
        if (socket) {
            socket.on('new-chat', handleNewChat);
            return () => {
                socket.off('new-chat', handleNewChat);
            }
        }

    }, [triggerRender]);

    // Update contact list when chat deletion occurs.
    useEffect(() => {
        const handleDeletedChat = () => {
            setTriggerRender(1 - triggerRender);
        }
        if (socket) {
            socket.on('deleted-chat', handleDeletedChat);
            return () => {
                socket.off('deleted-chat', handleDeletedChat);
            }
        }
    }, [triggerRender]);

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
