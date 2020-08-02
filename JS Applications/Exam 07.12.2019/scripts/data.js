import { beginRequest, endRequest } from './notification.js';

function host(endpoint) {
    return `https://api.backendless.com/E15E5F9E-E9AC-2711-FF3F-DD38D7F11000/D0A716D3-8A5D-485A-BC25-FCE6F80EA962/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    TREKS: 'data/treks'
}

export async function register(username, password) {
    beginRequest();

    const result = (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();

    endRequest();

    return result;
}

export async function login(username, password) {
    beginRequest();

    const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    endRequest();

    return result;
}

export async function logout() {
    beginRequest();

    const token = localStorage.getItem('userToken');

    localStorage.removeItem('userToken');

    const result = fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

    endRequest();

    return result;
}

export async function allTreks() {
    beginRequest();

    const token = localStorage.getItem('userToken');

    let result = (await fetch(host(endpoints.TREKS), {
            headers: {
                'user-token': token
            }
        })).json();

    endRequest();

    return result;
}

export async function request(trek) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.TREKS), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(trek)
    })).json();

    endRequest();

    return result;
}
