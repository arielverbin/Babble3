import './contact.css';
import RemoveContact from "./RemoveContact";

function ContactItem({   // contact data.
                         id,
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
                    <RemoveContact focusedContact={focusedContact} id={id}
                                   setDisplayedContacts={setDisplayedContacts} setFocusedContact={setFocusedContact}/>
                }
                <img src={pic} className="contact-pic" alt="contact-pic"/>
                <h5 className="d-inline-block text-truncate contact-name">
                    {name} <label className="contact-username">• {username}</label>
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