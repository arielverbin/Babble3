import './chat.css';
import ChatContent from './ChatContent/ChatContent';
import SendMessage from './SendMessage/SendMessage';

function Chat({contact, contacts, setContacts, chat, setCurChat}) {

    if (contact === undefined || chat === undefined) {
        return (<div id="chat">
            <label id="empty-chat-label">Select a contact to open a chat.</label>
        </div>);
    }

    return (
        <div id="chat">
            <header className="chat-header">
                <label className="contact-header-name text-truncate"> {contact.name} </label>
                <img src={contact.pic} className="contact-header-pic" alt="contact-pic"/>
            </header>

            <ChatContent chat={chat}/>

            <SendMessage setCurChat={setCurChat} curContact={contact} contacts={contacts} setContacts={setContacts}/>
        </div>
    );
}

export default Chat;


