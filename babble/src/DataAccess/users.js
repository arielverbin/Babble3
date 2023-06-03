export function setUserJWT(newJWT) {
    localStorage.setItem('JWT', newJWT);
}

export function logOut() {
    localStorage.setItem('JWT', undefined)
    localStorage.setItem('username', undefined);
    localStorage.setItem('displayName', undefined);
    localStorage.setItem('profilePic', undefined);
}

/**
 * Register a new user.
 */
export async function registerUser(username, password, displayName, profilePic) {
    try {
        const userData = {
            "username": username,
            "password": password,
            "displayName": displayName,
            "profilePic": profilePic
        };

        const res = await fetch('http://localhost:5001/api/Users', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify(userData)
        });

        if (res.status === 200) {
            return 'success';
        } else if (res.status === 409) {
            return 'Username already exists.';
        }

        return "Ooopss! We've run into a problem :(\nPlease try again later";
    } catch (error) {
        console.error('Error fetching messages:', error);
        return "Ooopss! We've run into a problem :(\nPlease try again later";
    }
}

/**
 * Returns the user's data (username, displayName, profile-pic)
 */
async function getUserDetails(username) {
    try {
        const res = await fetch('http://localhost:5001/api/Users/' + username, {
            'method': 'get',
            'headers': {
                'Content-Type': 'application/json',
                "authorization": 'Bearer ' + localStorage.getItem('JWT'),
            }
        });
        if (res.status === 200) {
            return await res.json();
        } else return "Ooopss! We've run into a problem :(\nPlease try again later";
    } catch (error) {
        console.error('Error fetching messages:', error);
        return "Ooopss! We've run into a problem :(\nPlease try again later";
    }
}

export async function setUserDetails(username, newPic, newDisplayName) {
    console.log("lmao: " + username);
    try {
        console.log("trying....");
        const res = await fetch('http://localhost:5001/api/Users/' + username, {
            'method': 'put',
            'headers': {
                'Content-Type': 'application/json',
                "authorization": 'Bearer ' + localStorage.getItem('JWT'),
            },
            'body': JSON.stringify({"newPic": newPic, "newDisplayName": newDisplayName}),
        });

        return res.status === 200 ? 'success' : 'error';
    } catch (error) {
        console.error('Error fetching messages:', error);
        return 'error';
    }
}

/**
 * Logs in a username.
 */
export async function loginUser(username, password) {
    try {
        const userData = {
            "username": username,
            "password": password
        }

        const res = await fetch('http://localhost:5001/api/Tokens', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify(userData)
        });

        if (res.status === 200) {
            const userJWT = await res.text(); //save the user's token.
            localStorage.setItem('JWT', userJWT);
            return await getUserDetails(username);

        }
        return res.status === 404 ? 'Username or password does not match.' :
            "Ooopss! We've run into a problem :(\nPlease try again later";
    } catch (error) {
        console.error('Error fetching messages:', error);
        return "Ooopss! We've run into a problem :(\nPlease try again later";
    }
}