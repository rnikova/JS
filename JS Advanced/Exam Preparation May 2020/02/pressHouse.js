function PressHouse(){
    class Article{
        constructor(title, content){
            this.title = title;
            this.content = content;
        }

        toString(){
            return `Title: ${this.title}\nContent: ${this.content}`;
        }
    }

    class ShortReports extends Article{
        #comments;
        constructor(title, content, originalResearch){
            super(title, content);
            this.originalResearch = originalResearch;
            this.#comments = [];
        }

        get content(){
            return this._content;
        }

        set content(content){
            if(content.length >= 150){
                throw new Error(`Short reports content should be less then 150 symbols.`);
            }

            this._content = content;
        }

        get originalResearch(){
            return this._originalResearch;
        }

        set originalResearch(originalResearch){
            if(!originalResearch.hasOwnProperty('author') || !originalResearch.hasOwnProperty('title')){
                throw new Error(`The original research should have author and title.`);
            }

            this._originalResearch = originalResearch;
        }

        addComment(comment){
            this.#comments.push(comment);
            return `The comment is added.`;
        }

        toString(){
            let result = super.toString() + `\nOriginal Research: ${this.originalResearch.title} by ${this.originalResearch.author}\n`;

            if(this.#comments.length > 0){
                result += 'Comments:\n';
                result += this.#comments.join('\n');
            }

            return result.trim();
        }
    }

    class BookReview extends Article{
        #clients;
        constructor(title, content, book){
            super(title, content);
            this.book = book;
            this.#clients = [];
        }

        addClient(clientName,  orderDescription){
            this.#clients.forEach(e => {
                if(e.clientName === clientName && e.orderDescription === orderDescription){
                    throw new Error(`This client has already ordered this review.`);
                }
            });

            let client = {
                clientName,
                orderDescription
            };
            this.#clients.push(client);

            return `${clientName} has ordered a review for ${this.book.name}`;
        }

        toString(){
            let result = super.toString() + `\nBook: ${this.book.name}\n`;

            if(this.#clients.length > 0){
                result += 'Orders:\n';
                this.#clients.forEach(e =>
                    result += `${e.clientName} - ${e.orderDescription}\n`
                )
            }
            result = result.substring(0, result.length - 1);
            return result;
        }
    }

    return {
        Article,
        ShortReports,
        BookReview
    }
}