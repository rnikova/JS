function host(endpoint) {
    return `https://api.backendless.com/23732309-482E-8916-FF8D-EAE342D3F000/6E1801A7-EFA6-4011-B7B5-9C34980F8134/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    SHOES: 'data/shoes',
    SHOES_BY_ID: 'data/shoes/'
}

export async function register(email, password) {

    const result = (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })).json();

    return result;
}

export async function login(email, password) {
    const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: email,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('email', result.email);
    localStorage.setItem('userId', result.objectId);

    return result;
}

export async function logout() {
    const token = localStorage.getItem('userToken');

    localStorage.removeItem('userToken');

    const result = fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

    return result;
}

export async function allShoes() {
    const token = localStorage.getItem('userToken');

    let result = (await fetch(host(endpoints.SHOES), {
            headers: {
                'user-token': token
            }
        })).json();

    return result;
}

export async function create(shoes) {
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.SHOES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(shoes)
    })).json();

    return result;
}

export async function getShoesById(id) {
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.SHOES_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();

    return result;
}

export async function edit(id, updatedProps) {
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.SHOES_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    return result;
}

export async function deleteShoes(id) {
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.SHOES_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    return result;
}

export async function buy(shoes) {
    const email = localStorage.getItem('email');
    const shoesId = shoes.objectId;    
    const newPeople = shoes.people[{email: email}];

    return edit(shoesId, { people: newPeople });
}