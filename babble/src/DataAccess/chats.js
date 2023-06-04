import io from "socket.io-client";
const socket = io.connect("localhost:5001");

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


export async function getMessages(contactID) {
    //console.log("id: " + contactID)
    try {
        const res = await fetch('http://localhost:5001/api/Chats/' +
            contactID.toString() + '/Messages', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('JWT'),
            },
        });

        if (res.status === 200) {
            const rawMessages = await res.json();
            const messages = [];
            const ourUsername = localStorage.getItem('username');
            for (let i = rawMessages.length - 1; i >= 0; i--) {
                messages.push({
                    content: rawMessages[i]['content'],
                    reply: rawMessages[i]['sender']['username'] !== ourUsername,
                    timeSent: getTime(rawMessages[i]['created']),
                    daySent: getDay(rawMessages[i]['created']),
                    attachedFile: null,
                });
            }
            return messages;
        }
        return 'Error downloading previous messages.';

    } catch (error) {
        console.error('Error fetching messages:', error);
        return 'Error downloading previous messages.';
    }
}


export async function sendMessage(contactID, content) {

    try {
        const res = await fetch('http://localhost:5001/api/Chats/' +
            contactID.toString() + '/Messages', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                "authorization": 'Bearer ' + localStorage.getItem('JWT'),
            },
            'body': JSON.stringify({"msg": content})
        });
        socket.emit("send_message");
        return res.status === 200 ? 'success' : 'An error occurred, please try again.';
    } catch(error) {
        console.error('Error fetching messages:', error);
        return 'An error occurred, please try again.';
    }
}