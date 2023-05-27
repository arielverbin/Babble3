import './chatContent.css';
import {useEffect, useRef} from 'react';
import Message from '../Message/Message';

function ChatContent({chat}) {

    // convert json of chat to HTML.
    const messagesFlow = chat.map((message, key) => {
        return <Message {...message} key={key}/>
    });

    const chatContent = useRef(null);

    // auto scroll to bottom.
    useEffect(() => {
        // Set scroll position to the bottom on initial render
        chatContent.current.scrollTop = chatContent.current.scrollHeight;
    }, [chat]);

    return (
        <div id="chat-content" ref={chatContent}>
            {messagesFlow.length === 0 ? (
                <div>
                    <label>Looks like there aren't any messages yet. <hr></hr></label>
                </div>
            ) : (
                <div>
                    <label>No Previous Messages.
                        <hr></hr>
                    </label>
                </div>
            )}
            {messagesFlow}
        </div>
    );
}

export default ChatContent;