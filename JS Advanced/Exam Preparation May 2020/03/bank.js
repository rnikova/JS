class Bank{
    #allCustomers;
    constructor (bankName){
        this.bankName = bankName;
        this.#allCustomers = [];
    }

    newCustomer (customer){
        if(this.#allCustomers.find(c => c.personalId === customer.personalId)){
            throw new Error(`${customer.firstName} ${customer.lastName} is already our customer!`);
        }
            
        this.#allCustomers.push(customer);
        return customer;
    }

    depositMoney (personalId, amount){
        let customer = this.#allCustomers.find(c => c.personalId === personalId);

        if(customer === undefined){
            throw new Error(`We have no customer with this ID!`);
        }

        if(customer['totalMoney'] === undefined){
            customer['totalMoney'] = 0;
        }
        if(customer['transactions'] === undefined){
            customer['transactions'] = [];
        }
        customer['totalMoney'] += amount;
        customer['transactions'].push(`${customer.firstName} ${customer.lastName} made deposit of ${amount}$!`)
        return `${customer['totalMoney']}$`;
    }

    withdrawMoney (personalId, amount){
        let customer = this.#allCustomers.find(c => c.personalId === personalId);

        if(customer === undefined){
            throw new Error(`We have no customer with this ID!`);
        }
        else if(customer['totalMoney'] < amount){
            throw new Error(`${firstName} ${lastName} does not have enough money to withdraw that amount!`);
        }
        if(customer['transactions'] === undefined){
            customer['transactions'] = [];
        }
        customer['transactions'].push(`${customer.firstName} ${customer.lastName} withdrew ${amount}$!`);
        customer['totalMoney'] -= amount;
        return `${customer['totalMoney']}$`;
    }

    customerInfo (personalId){
        let customer = this.#allCustomers.find(c => c.personalId === personalId);

        if(customer === undefined){
            throw new Error(`We have no customer with this ID!`);
        }

        let result = `Bank name: ${this.bankName}\n`;
        result += `Customer name: ${customer.firstName} ${customer.lastName}\n`;
        result += `Customer ID: ${customer.personalId}\n`;
        result += `Total Money: ${customer.totalMoney}$\n`;
        result += `Transactions:\n`;
        for (let i = customer.transactions.length; i > 0; i--) {
           result += `${i}. ${customer.transactions[i - 1]}\n`;
        }

        return result.trim();
    }
}