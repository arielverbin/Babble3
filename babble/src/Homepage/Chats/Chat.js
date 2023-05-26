import './chat.css';
import ChatContent from './ChatContent/ChatContent';
import SendMessage from './SendMessage/SendMessage';

function Chat({contact, chat, setCurChat, focusedContact, displayedContacts}) {

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

            <SendMessage chat={chat} setCurChat={setCurChat} curContact={displayedContacts[focusedContact]}/>
        </div>
    );
}

export default Chat;


