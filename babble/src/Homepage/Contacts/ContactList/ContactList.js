import {useEffect, useRef, useState} from "react";
import ContactItem from "../ContactItem/ContactItem";
import AddContact from "./AddContact";
import './contactList.css';

function ContactList({displayedContacts, setDisplayedContacts, focusedContact, setFocusedContact}) {

    // create HTML of contact list.
    const contactList = Object.entries(displayedContacts).map(([key, contact]) => {
        if (key === focusedContact) { // create contact item for focused contact.
            return <ContactItem name={contact.name} lastMes={'Now Chatting'} unreads={0} pic={contact.pic} key={key}
                                username={key} focus={true} setFocusedContact={setFocusedContact}
                                focusedContact={focusedContact} setDisplayedContacts={setDisplayedContacts}
                                displayedContacts={displayedContacts}/>;
        }
        return <ContactItem {...contact} key={key} username={key} focus={false} setFocusedContact={setFocusedContact}/>;
    });

    const [matchingContactList, setMatchingContactList] = useState(contactList);

    // Refresh contact list according to search box.
    useEffect(() => {
        setMatchingContactList(
            contactList.filter(contact => {
                const contactName = contact.props.name.toLowerCase();
                const search = searchBox.current.value.toLowerCase().trim();
                return contactName.includes(search);
            })
        );
    }, [focusedContact, displayedContacts]);

    const searchBox = useRef(null);

    // filter contacts that do not match the search.
    const handleSearch = function () {
        setMatchingContactList(
            contactList.filter(contact => {
                const contactName = contact.props.name.toLowerCase();
                const search = searchBox.current.value.toLowerCase().trim();
                return contactName.includes(search);
            })
        );
    }

    return (
        <>
            <div id="contacts">
                {/*Chats title ("Chats", and "add contact" button)*/}
                <div id="chats-title">
                    <label className="fw-bold">Chats</label>
                    <AddContact displayedContacts={displayedContacts} setDisplayedContacts={setDisplayedContacts}/>
                    <input
                        type="text"
                        placeholder="Search..."
                        id="search-contact"
                        ref={searchBox}
                        spellCheck="false"
                        onChange={handleSearch}
                    />
                </div>

                {/*Container of all contacts*/}

                <div className="container">
                    {matchingContactList.length === 0 ? (
                        <label id='no-contacts'>No Contacts.</label>
                    ) : (
                        matchingContactList
                    )}

                </div>
            </div>
        </>
    );
}

export default ContactList;