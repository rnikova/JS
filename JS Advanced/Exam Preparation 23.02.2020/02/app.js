class Article{
    #comments;
    #likes;
    constructor(title, creator){
        this.title = title;
        this.creator = creator;
        this.#comments = [];
        this.#likes = new Set();
    }

    get likes(){
        if(this.#likes === 0){
            return `${this.title} has 0 likes`;
        }else if(this.#likes.size === 1){
            return `${Array.from(this.#likes)[0]} likes this article!`;
        }else{
            return `${Array.from(this.#likes)[0]} and ${this.#likes.size - 1} others like this article!`;
        }
    }

    like (username){
        if(this.#likes.has(username)){
            throw new Error("You can't like the same article twice!");
        }else if(this.creator === username){
            throw new Error("You can't like your own articles!");
        }else{
            this.#likes.add(username);
            return `${username} liked ${this.title}!`;
        }
    }

    dislike (username){
        if(this.#likes.has(username)){
            this.#likes.delete(username);
            return `${username} disliked ${this.title}`;
        }else{
            throw new Error("You can't dislike this article!");
        }
    }

    comment(username, content, id){
        if(id === undefined || this.#comments[id] === undefined){
            let newId = this.#comments.length + 1;
            this.#comments.push({
                id: newId,
                username, 
                content, 
                replies: []});

                return `${username} commented on ${this.title}`;
        }else{
            let newId = this.#comments[id - 1].replies.length - 1;
            this.#comments[id - 1].replies.push({
                id: newId,
                username,
                content});

            return "You replied successfully";
        }
    }

    toString(sortingType){
        let result = [
            `Title: ${this.title}`,
            `Creator: ${this.creator}`,
            `Likes: ${this.likes}`,
            `Comments:`
       ];

       if(sortingType === 'asc'){
        this.#comments.forEach((c, i) => {
            result.push(`-- ${i + 1}. ${c.username}: ${c.content}`);
            c.replies.forEach((r, j) => {
                result.push(`--- ${i + 1}.${j + 1} ${r.username}: ${r.content}`);
            })
        });
       }else if(sortingType === 'desc'){
        for (let i = this.#comments.length - 1; i >= 0; i--) {
            let c = this.#comments[i];
            result.push(`-- ${i + 1}. ${c.username}: ${c.content}`);

            for(let j = this.#comments[i].replies.length - 1; j >= 0; j--){
                let r = this.#comments[i].replies[j];
                result.push(`--- ${i + 1}.${j + 1} ${r.username}: ${r.content}`);
            }
        }
       }else{
        let comments = this.#comments.slice();
        comments.sort(Article.comparator);
        comments.sort((a, b) => a.username.localeCompare(b.username));
        comments.forEach(c => {
            result.push(`-- ${c.id}. ${c.username}: ${c.content}`);
            let replies = c.replies.slice();
            replies.sort(Article.comparator);
            replies.forEach( r => {
                    result.push(`--- ${c.id}.${r.id} ${r.username}: ${r.content}`);
            })
        })
       }

       return result.join('\n');
    }

    static comparator(a, b){
        return a.username.localeCompare(b.username);
    }
}