const username = 'rosmari';
const password = '123456';
const appKey = 'kid_ryKNBM3sB';
const appSecret = 'e8f780d71e0942aab044e0206556b95';

const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/students`;

function makeHeaders(method, data) {
    const headers = {
        method: method,
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            'Content-Type': 'application/json'
        }
    }
    if (method === 'PUT' || method === 'POST') {
        headers.body = JSON.stringify(data);
    }
    return headers;
}
async function get() {
    const headers = makeHeaders('GET');
    const data = await fetchRequest(baseUrl, headers);
    return data;
}
async function post(body) {
    const headers = makeHeaders('POST', body);
    const data = fetchRequest(baseUrl, headers);
    return data;
}
async function put(body, bookID) {
    const headers = makeHeaders('PUT', body);
    const url = `${baseUrl}/${bookID}`;
    return fetchRequest(url, headers);
}
async function del(bookID) {
    const headers = makeHeaders('DELETE');
    const url = `${baseUrl}/${bookID}`;
    return fetchRequest(url, headers);
}
async function fetchRequest(url, headers) {
    return fetch(url, headers)
        .then(checkForErrors)
        .then(data => data.json())
        .catch(console.error)
}
function checkForErrors(req) {
    if (!req.ok) {
        throw new Error(`${req.status} - ${req.statusText}`);
    }
    return req;
}
export { get, post, put, del }