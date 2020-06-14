function solution() {
    let sections = document.querySelectorAll('.card');
    let addBtn = document.getElementsByTagName('button')[0];
    addBtn.addEventListener('click', AddGift);
    
    function AddGift(){
        let gift = document.querySelector('input');
        let li = document.createElement('li');
        li.className = 'gift';
        let ul = document.querySelector('ul');
        li.textContent = gift.value;
        let send = document.createElement('button');
        send.id = 'sendButton';
        send.textContent = 'Send';
        send.addEventListener('click', Sent);
        let discard = document.createElement('button');
        discard.id = 'discardButton';
        discard.textContent = 'Discard';
        discard.addEventListener('click', Discarded);
        li.appendChild(send);
        li.appendChild(discard);
        ul.appendChild(li);
    }

    function Sent(e){
        let sent = sections[2].children[1];
        let gift = e.target.parentNode;
        let giftValue = gift.textContent;
        gift.textContent = giftValue.slice(0, giftValue.length - 11);
        sent.appendChild(gift);
    }

    function Discarded(e){
        let discarded = sections[3].children[1];
        let gift = e.target.parentNode;
        let giftValue = gift.textContent;
        gift.textContent = giftValue.slice(0, giftValue.length - 11);
        discarded.appendChild(gift);
    }
}