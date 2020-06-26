import {get, post, put, del} from 'requester.js';

(async function test(){
    try{
        const books = await get('appdata', 'books');
        console.log(books);
    }catch(err){
        alert(err);
    }
}());