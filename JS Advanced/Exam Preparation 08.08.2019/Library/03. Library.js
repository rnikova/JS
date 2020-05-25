class Library{
    constructor(libraryName){
        this.libraryName = libraryName;
        this.subscribers = [];
        this.subscriptionTypes ={
            normal: this.libraryName.length,
            special: this.libraryName.length * 2,
            vip: Number.MAX_SAFE_INTEGER
        }
    };

    subscribe(name, type){
        if (this.subscriptionTypes[type]) {
            throw new Error(`The type ${type} is invalid`);
        }

        let findSubsriber = this.subscribers.find(s => s.name == name);

        if (!findSubsriber) {
            this.subscribers.push({
                name,
                type,
                books: []
            });
        }else{
            findSubsriber.type = type;
        }

        return findSubsriber ? findSubsriber : this.subscribers[this.subscribers.length -1]
    }

    unsubscribe(name){
        let subscriberIndex = this.subscribers.findIndex(s => s.name == name);

        if(subscriberIndex === -1){
            throw new Error(`There is no such subscriber as ${name}`);
        }

        this.subscribers.splice(subscriberIndex, 1);

        return this.subscribers;
    }

    receiveBook(subscriberName, bookTitle, bookAuthor){
        let findSubsriber = this.subscribers.findIndex(s => s.name == subscriberName);

        if(!findSubsriber){
            throw new Error(`There is no such subscriber as ${subscriberName}`);
        }

        let subType = findSubsriber.type;
        let limit = this.subscriptionTypes[subType];

        if(findSubsriber.books.length >= booksCount){
            throw new Error(`You have reached your subscription limit ${limit}!`)
        }

        findSubsriber.books.push({title: bookTitle, author: bookAuthor});

        return findSubsriber;
    }

    showInfo(){
        if(!this.subscribers.length){
            return `${this.libraryName} has no information about any subscribers`;
        }

        return this.subscribers
        .map(s => {
            let booksOutput = s.books
            .map(b => `${b.title} by ${b.author}`)
            .join(', ');

            return `Subscriber: ${s.name}, Type: ${s.type}\nReceived books: ${booksOutput}`;
        })
        .join('\n');
    }
}