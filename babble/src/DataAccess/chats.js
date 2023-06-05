// NOTE: 'chat' represents messages.

import {serverAddress} from "./users";

function getTime(timeString) {
    const dateObj = new Date(timeString);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function getDay(timeString) {
    const dateObj = new Date(timeString);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear().toString();

    // Array of month names
    const monthNames = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];

    const month = monthNames[monthIndex];

    return `${month} ${day}, ${year}`;
}

// fills the field 'attachedFile' in each message (with only the file's name).
async function fillAttachments(messages, contactID) {
    try {
        const res = await fetch(serverAddress + '/api/Chats/' +
            contactID.toString() + '/Messages/FilesAttach', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('JWT'),
            },
        });
        if (res.status === 200) {
            const rawNames = await res.json();
            // attach files to messages.
            return messages.map(message => {
                const matchingFile = rawNames.find(file => file.attachedMsg === message.id);
                const attachedFile = matchingFile ? matchingFile.name : null;

                return {
                    ...message,
                    attachedFile
                };
            });
        }
        return 'error';
    } catch (error) {
        console.log("Server does not support file attachments.");
        return 'error';
    }
}

export async function getMessages(contactID) {
    console.log("id: " + contactID)
    try {
        const res = await fetch(serverAddress + '/api/Chats/' +
            contactID.toString() + '/Messages', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('JWT'),
            },
        });

        if (res.status === 200) {
            const rawMessages = await res.json();
            let messages = [];
            const ourUsername = localStorage.getItem('username');
            for (let i = rawMessages.length - 1; i >= 0; i--) {
                messages.push({
                    id: rawMessages[i]["_id"],
                    content: rawMessages[i]['content'],
                    reply: rawMessages[i]['sender']['username'] !== ourUsername,
                    timeSent: getTime(rawMessages[i]['created']),
                    daySent: getDay(rawMessages[i]['created']),
                    attachedFile: null,
                });
            }
            // Downloaded messages, move to downloading their attached messages.
            const messagesWithFiles = await fillAttachments(messages, contactID);
            if (messagesWithFiles === 'error') {
                // An error might occur if the server does not support files.
                // In this case, just fetch the messages without files.
                return messages;
            }
            return messagesWithFiles;
        }
        return 'Error downloading previous messages.';

    } catch (error) {
        console.log('Error fetching messages:', error);
        return 'Error downloading previous messages.';
    }
}

export async function getFile(messageID) {
    try {
        const res = await fetch(serverAddress + '/api/Chats/' +
            '/Messages/FilesAttach/' + messageID, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('JWT'),
            },
        });
        return res.status === 200 ? await res.json() : 'error';
    } catch (error) {
        console.log('Error fetching file:' + error);
        return 'error';
    }
}

export async function sendMessage(contactID, content, fileName, file) {
    try {
        const res = await fetch(serverAddress + '/api/Chats/' +
            contactID.toString() + '/Messages', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                "authorization": 'Bearer ' + localStorage.getItem('JWT'),
            },
            'body': file ? JSON.stringify({
                "msg": content,
                "fileName": fileName,
                "fileData": file
            }) : JSON.stringify({"msg": content})
        });

        return res.status === 200 ? 0 : 'An error occurred, please try again.';
    } catch (error) {
        console.log('Error fetching messages:', error);
        return 'An error occurred, please try again.';
    }
}