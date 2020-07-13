const appSecret = '391042d189554dd481bd282585aa8191';
const appKey = 'kid_BJA26KA2S';
const baseUrl = `https://baas.kinvey.com`;

function createAuthorization(type) {
    return type === 'Basic'
        ? `Basic ${btoa(`${appKey}:${appSecret}`)}`
        : `Kinvey ${sessionStorage.getItem('authtoken')}`
}
function createHeaders(type, method, data) {
    const headers = {
        method: method,
        headers: {
            'Authorization': createAuthorization(type),
            'Content-Type': 'application/json'
        }
    }
    if (method === 'PUT' || method === 'POST') {
        headers.body = JSON.stringify(data);
    }
    return headers;
}

function handleError(e){
    if(!e.ok){
        throw new Error(e.statusText);
    }
    return e;
}

function deserializeData(x){
    if(x.status === 204){
        return x;
    }
    return x.json();
}

function fetchData(kinveyModule, endPoint, headers){
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endPoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(deserializeData)
}

function get(kinveyModule, endPoint, type){
    const headers = createHeaders(type, "GET");

    return fetchData(kinveyModule, endPoint, headers);
}

function post(kinveyModule, endPoint, data, type){
    const headers = createHeaders(type, "POST", data);

    return fetchData(kinveyModule, endPoint, headers);
}

function put(kinveyModule, endPoint, data, type){
    const headers = createHeaders(type, "PUT", data);

    return fetchData(kinveyModule, endPoint, headers);
}

function del(kinveyModule, endPoint, type){
    const headers = createHeaders(type, "DELETE");

    return fetchData(kinveyModule, endPoint, headers);
}

export { get, post, put, del }