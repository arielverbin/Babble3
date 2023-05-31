export var chats = {
    "guest": {
        "katniss":
            [
                {content: "Help them!", reply: true, timeSent: "13:24", extendedTime: "", attachedFile: null},
                {content: " Get them out!!", reply: true, timeSent: "13:24", attachedFile: null},
                {content: "Katniss?", reply: false, timeSent: "13:26", attachedFile: null},
                {
                    content: "Katniss, Can you tell everyone what you're seeing right now?",
                    reply: false,
                    timeSent: "13:26",
                    attachedFile: null
                },
                {content: "Katniss what do you want to say?", reply: false, timeSent: "13:26", attachedFile: null},
                {
                    content: "I want the rebels to know that I'm ALIVE",
                    reply: true,
                    timeSent: "13:26",
                    attachedFile: null
                },
                {content: "and I am in district 8!", reply: true, timeSent: "13:26", attachedFile: null},
                {
                    content: "Where the capital just bombed a hospital filled with unarmed men, women and children! and there will be no survivors!",
                    reply: true,
                    timeSent: "13:27",
                    attachedFile: null
                },
                {content: "We must fight back!", reply: true, timeSent: "13:27", attachedFile: null},
                {
                    content: "I have a message for president Snow - You can torture us, and bomb us, and burn our districts to the ground. But do you see that? fire is catching.",
                    reply: true,
                    timeSent: "13:27",
                    attachedFile: null
                },
                {
                    content: "And if we burn, you burn with us!",
                    reply: true,
                    timeSent: "13:27",
                    extendedTime: "31/2/2621 13:27",
                    attachedFile: null
                },
            ],

        "ross":
            [
                {content: "I can't believe you slept with her!", reply: false, timeSent: "13:24", attachedFile: null},
                {content: "So you're not gonna say anything?", reply: false, timeSent: "13:39", attachedFile: null},
                {
                    content: "We were on a break!! I also attached a file to this message to check this cool webstie!",
                    reply: true,
                    timeSent: "13:40",
                    attachedFile: new File(["We were on a break!! (but inside a file!)"], "hi.txt", {type: "text/plain"})
                },
                {
                    content: "OMG that's so cool! I totally forgive you",
                    reply: false,
                    timeSent: "13:43",
                    attachedFile: null
                },
                {
                    content: "Thanks 😁🥰",
                    reply: true,
                    timeSent: "13:43",
                    extendedTime: "31/2/2621 13:27",
                    attachedFile: null
                },
            ],

        "eleven":
            [],
        "walter":
            [],
    }
};

export function createChat(username, ourUsername) {
    if(!chats[ourUsername]) {
        chats[ourUsername] = {};
    }
    chats[ourUsername][username] = [];
}

export function updateChat(newChat, username, ourUsername) {
    if(!chats[ourUsername]) {
        chats[ourUsername] = {};
    }
    chats[ourUsername][username] = newChat;
}

export function deleteChat(username, ourUsername) {
    if(!chats[ourUsername]) {
        return;
    }
    delete chats[ourUsername][username];
}
