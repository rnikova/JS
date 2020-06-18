class ChristmasDinner {
    #budget;
    constructor(budget){
        this.#budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }

    set budget(b){
        if(b < 0){
            throw new Error("The budget cannot be a negative number");
        }
    }

    shopping(product){
        if(this.#budget < product[1]){
            throw new Error("Not enough money to buy this product");
        }

        this.#budget -= product[1];
        this.products.push(product[0]);
        return `You have successfully bought ${product[0]}!`;
    }

    recipes(recipe){
        recipe.productsList.forEach(e => {
            if(!this.products.includes(e)){
                throw new Error("We do not have this product");
            }
        });

        this.dishes.push(recipe);
        return `${recipe.recipeName} has been successfully cooked!`;
    }

    inviteGuests(name, dish){
        this.dishes.forEach(e => {
            if (!this.dishes.recipeName === name) {
                throw new Error("We do not have this dish");
            }   
        });

        if(this.guests.hasOwnProperty(name)){
            throw new Error("This guest has already been invited");
        }

        this.guests[name] = dish;
        return `You have successfully invited ${name}!`;
    }

    showAttendance(){
        let result = "";

        for (const name in this.guests) {
            result += `${name} will eat ${this.guests[name]}, which consists of `;

            this.dishes.forEach(e => {
                if(this.guests[name] === e.recipeName){
                    result += e.productsList.join(', ');
                }
            })
            result += "\n";
        }

        return result.trim();
    }
}