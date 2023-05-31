
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
    const userData = {
        "username": username,
        "password": password,
        "displayName": displayName,
        "profilePic": profilePic
    };

    const res = await fetch('http://localhost:5000/api/Users', {
        'method': 'post',
        'headers': {
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(userData)
    });
    console.log('Returned status: ' + res.status);

    if (res.status === 200) {
        return 'success';
    } else if (res.status === 409) {
        return 'Username already exists.';
    }

    return "Ooopss! We've run into a problem :(\nPlease try again later";
}

/**
 * Returns the user's data (username, displayName, profile-pic)
 */
async function getUserDetails(username) {
    const res = await fetch('http://localhost:5000/api/Users/' + username, {
        'headers' : {
            'Content-Type': 'application/json',
            "authorization" : 'Bearer ' + localStorage.getItem('JWT'),
        }
    });
    console.log('Return status: ' + res.status);
    if(res.status === 200) {
        return await res.json();
    }
    else return "Ooopss! We've run into a problem :(\nPlease try again later";

}

/**
 * Logs in a username.
 */
export async function loginUser(username, password) {
    const userData = {
        "username" : username,
        "password" : password
    }

    const res = await fetch('http://localhost:5000/api/Tokens', {
        'method' : 'post',
        'headers' : {
            'Content-Type' : 'application/json',
        },
        'body' : JSON.stringify(userData)
    });

    if(res.status === 200) {
        const userJWT = await res.text(); //save the user's token.
        localStorage.setItem('JWT', userJWT);
        console.log('Logged in, JWT=' + localStorage.getItem('JWT'));
        return await getUserDetails(username);

    } else if(res.status === 404) {
        return 'Username or password does not match.';
    }
    return "Ooopss! We've run into a problem :(\nPlease try again later";
}