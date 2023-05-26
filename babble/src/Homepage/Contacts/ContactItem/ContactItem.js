import './contact.css';
import {contacts} from '../../../userData.js'
import RemoveContact from "./RemoveContact";

function ContactItem({   // contact data.
                         name,
                         lastMes,
                         pic,
                         timeChatted,
                         unreads,
                         username,
                         focus,
                         setFocusedContact,
                         focusedContact,
                         setDisplayedContacts
                     }) {

    const changeContact = function (contact) {
        contacts[localStorage.getItem('username')][contact].unreads = 0;
        setFocusedContact(contact);
    }

    return (
        <>
            <div className="seperator"/>
            <div className={`contact${focus ? ' chosen-contact' : ''}`}
                 onClick={focus ? null : () => changeContact(username)}>

                {unreads !== 0 && <label className="unreads">{unreads}</label>}
                {focus &&
                    // delete contact button.
                    <RemoveContact focusedContact={focusedContact}
                                   setDisplayedContacts={setDisplayedContacts} setFocusedContact={setFocusedContact}/>
                }
                <img src={pic} className="contact-pic" alt="contact-pic"/>
                <h5 className="d-inline-block text-truncate contact-name">
                    {name}
                </h5>
                <span className="d-inline-block text-truncate last-message">
                    {lastMes}
                </span>
                <span className="time-chatted">{timeChatted}</span>
            </div>
        </>
    );
}

export default ContactItem;