function convertTimeFormat(timeString) {
    const dateTime = new Date(timeString);

    const day = String(dateTime.getDate()).padStart(2, '0');
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const year = String(dateTime.getFullYear());
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export async function getContacts() {
    try {
        const res = await fetch('http://localhost:5001/api/Chats', {
            'method': 'get',
            'headers': {
                'Content-Type': 'application/json',
                "authorization": 'Bearer ' + localStorage.getItem('JWT'),
            },
        });

        if (res.status === 200) {
            let rawContacts = await res.json();
            let contacts = {};
            for (let i = 0; i < rawContacts.length; i++) {
                contacts[rawContacts[i]["user"]["username"]] = {
                    id: rawContacts[i]["id"],

                    name: rawContacts[i]["user"]["displayName"],

                    lastMes: (rawContacts[i]["lastMessage"] ? rawContacts[i]["lastMessage"]["content"] :
                        "This conversation is new."),

                    pic: rawContacts[i]["user"]["profilePic"],

                    timeChatted: (rawContacts[i]["lastMessage"] ?
                        convertTimeFormat(rawContacts[i]["lastMessage"]["created"]) : ""),

                    unreads: 0,
                    focus: false
                }
            }
            console.log("contacts: " + contacts[0]);
            return contacts;
        }
        return 'An error occurred, please try again.';
    } catch (error) {
        console.error('Error fetching messages:', error);
        return 'An error occurred, please try again.';
    }
}

export async function addContact(username) {

    try {
        const res = await fetch('http://localhost:5001/api/Chats', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                "authorization": 'Bearer ' + localStorage.getItem('JWT').toString(),
            },
            'body': JSON.stringify({"username": username})
        });

        if (res.status === 200) {
            let rawContact = await res.json();
            return {
                id: rawContact["id"],
                name: rawContact["user"]["displayName"],
                lastMes: 'This conversation is new.',
                pic: rawContact["user"]["profilePic"],
                timeChatted: '',
                unreads: 0,
                focus: false
            };
        }
        const response = await res.text();
        if (response === 'No such user') {
            return "User doesn't exist";
        }
        if (response === 'Thou shalt not talk with thy self') {
            return "No self-chats allowed! Invite a (real) friend and double the fun!";
        }
        return "Ooopss! We've run into a problem :(\nPlease try again later";
    } catch (error) {
        console.error('Error fetching messages:', error);
        return "Ooopss! We've run into a problem :(\nPlease try again later";
    }
}

export async function deleteContact(contactID) {
    try {
        const res = await fetch('http://localhost:5001/api/Chats/' + contactID.toString(), {
            'method': 'delete',
            'headers': {
                'Content-Type': 'application/json',
                "authorization": 'Bearer ' + localStorage.getItem('JWT').toString(),
            }
        });
        return res.status === 200 ? 'success' :
            "Ooopss! We've run into a problem :(\nPlease try again later";
    } catch (error) {
        console.error('Error fetching messages:', error);
        return "Ooopss! We've run into a problem :(\nPlease try again later";
    }
}