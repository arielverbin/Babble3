import {useRef, useState} from 'react';
import './sendMessage.css'
import {sendMessage} from "../../../DataAccess/chats";

function SendMessage({setCurChat, curContact, contacts, setContacts}) {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        event.target.value = '';
        setSelectedFile(file);
        if (file) {
            setDisabled(false);
            return;
        }
        setDisabled(inputBox.current.value === "");
    };

    const inputBox = useRef(null);
    const [disabled, setDisabled] = useState(true);

    function getCurrentTime() { // get time in format : hh:mm
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        // Add leading zeros if necessary
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return hours + ':' + minutes;
    }

    function getCurrentDateTime() { // get time in format: dd/mm/yyyy hh:mm
        const now = new Date();

        // Get day, month, year
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = now.getFullYear();

        // Get hours and minutes
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        // Format the date and time
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const handleSend = async function () {
        // create a new message.
        const newMessage = {
            content: inputBox.current.value,
            reply: false,
            timeSent: getCurrentTime(),
            extendedTime: getCurrentDateTime(),
            attachedFile: selectedFile ? selectedFile : null
        };
        const res = await sendMessage(curContact.id, inputBox.current.value);
        if (res === 'An error occurred, please try again.') {
            alert(res);
            return;
        }

        setCurChat((curChat) => [...curChat, newMessage]); //append message to chat array.
        curContact.lastMes = inputBox.current.value; //update lastMes.
        curContact.timeChatted = getCurrentDateTime(); //update timeChatted.
        setContacts({...contacts}); //trigger a re-render of contact list.

        inputBox.current.value = ""; // empty input box.
        setSelectedFile(null); //empty selected file.
        setDisabled(true);

        inputBox.current.focus();

    };

    // disable/enable send button.
    const enableSend = function () {
        setDisabled((inputBox.current.value === "") && (selectedFile === undefined || selectedFile === null));
    }

    // support sending via 'enter'
    const checkSend = function (event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault(); // Prevent form submission
            handleSend(); // Call your desired function here
        }
    }

    return (
        <div className="message-input">
            <div className="wrap-input">
                <form id="send-form">
                    <label id="attach-file" htmlFor="file-upload"/>
                    <input
                        disabled // Server does not support.
                        type="file"
                        id="file-upload"
                        onChange={handleFileInputChange}/>
                    {selectedFile && (<>
                        <label id="file-name">{selectedFile.name}</label>
                        <button
                            type="button"
                            id="deselect-file"
                            onClick={() => {
                                setSelectedFile(null);
                                setDisabled(inputBox.current.value === "");
                            }}
                        />
                    </>)}
                    <input
                        type="text"
                        placeholder="Write your message..."
                        id={selectedFile ? 'type-message-file' : 'type-message'}
                        ref={inputBox}
                        onChange={enableSend}
                        onKeyDown={checkSend}
                        autoComplete='off'
                    />
                    <button type="reset" id="send-message" onClick={(event) => {
                        event.preventDefault();
                        handleSend()

                    }} disabled={disabled}/>
                </form>
            </div>
        </div>
    );
}

export default SendMessage;