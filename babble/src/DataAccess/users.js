
export let userJWT = null;

export function setUserJWT(newJWT) {
    userJWT = newJWT;
}
export function logOut() {
    userJWT = null;
    localStorage.setItem('username', null);
    localStorage.setItem('password', null);
    localStorage.setItem('displayName', null);
    localStorage.setItem('profilePic', null);
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
        userJWT = await res.text(); // Assign the token value to the global userJWT variable
        return 'success';
    } else if (res.status === 409) {
        return 'Username already exists.';
    }

    return 'An error occurred, please try again.';
}

/**
 * Returns the user's data (username, displayName, profile-pic)
 */
async function getUserDetails(username) {
    const res = await fetch('http://localhost:5000/api/Users/' + username, {
        'headers' : {
            'Content-Type': 'application/json',
            "authorization" : 'Bearer ' + userJWT,
        }
    });
    console.log('Return status: ' + res.status);
    if(res.status === 200) {
        return await res.json();
    }
    else return 'An error occurred, please try again.';
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
        userJWT = await res.text(); //save the user's token.
        return await getUserDetails(username);

    } else if(res.status === 404) {
        return 'Username or password does not match.';
    }
    return 'An error occurred, please try again.';
}