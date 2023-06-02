import './chatContent.css';
import React from 'react';
import {useEffect, useRef} from 'react';
import Message from '../Message/Message';

function ChatContent({chat}) {

    // convert json of chat to HTML.
    let messagesFlow;
    if(chat && chat.length !== 0) {
        let prevDay = chat[0].daySent;
        messagesFlow = chat.map((message, key) => {
            if (message.daySent !== prevDay) {
                prevDay = message.daySent;
                return (
                    <React.Fragment key={key}>
                        <label className="date-area" key={`label-${key}`}>
                            <div>{message.daySent}</div>
                        </label>
                        <Message {...message} key={`message-${key}`} />
                    </React.Fragment>
                );
            }
            return <Message {...message} key={`message-${key}`} />;
        });


    } else {
        messagesFlow = [];
    }

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
                    <p className="date-area"><label>{chat[0].daySent}</label></p>
                </div>
            )}
            {messagesFlow}
        </div>
    );
}

export default ChatContent;