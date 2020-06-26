const username = 'rosmari';
const password = '123456';
const baseUrl = 'https://baas.kinvey.com/';
const appKey = 'kid_ryKNBM3sB';
const appSecret = 'e8f780d71e0942aab044e0206556b95';

function MakeHeaders(httpMethod, data){
    const headers = {
        method: httpMethod,
        headers: {
            'Authorization':`Basic ${btoa(`${username}:${password}`)}`,
            'Content-Type': 'application/json'
        }
    }

    if(httpMethod === 'POST' || httpMethod === 'PUT'){
        headers.body = JSON.stringify(data);
    }

    return headers;
}

function handleError(e){
    if(!e.ok){
        throw Error(e.statusText);
    }
    return e;
}

function serializeData(x){
    return x.json();
}

function fetchData(kinveyModule, endpoint, headers){
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(serializeData);
}

export function get(kinveyModule, endpoint){
    const headers = MakeHeaders('GET');
    
    return fetchData(kinveyModule, endpoint, headers);
}

export function post(kinveyModule, endpoint, data){
    const headers = MakeHeaders('POST', data);

    return fetchData(kinveyModule, endpoint, headers);
}

export function put(kinveyModule, endpoint, data){
    const headers = MakeHeaders('PUT', data);

    return fetchData(kinveyModule, endpoint, headers);
}

export function del(kinveyModule, endpoint){
    const headers = MakeHeaders('DELETE');

    return fetchData(kinveyModule, endpoint, headers);
}