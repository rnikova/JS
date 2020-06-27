class VeterinaryClinic{
    #clients;
    #currentWorkload;
    #totalProfit;
    constructor (clinicName, capacity){
        this.clinicName = clinicName;
        this.capacity = capacity;
        this.#clients = [];
        this.#currentWorkload = 0;
        this.#totalProfit = 0;
    }

    newCustomer(ownerName, petName, kind, procedures){
        if(this.#currentWorkload === this.capacity){
            throw new Error(`Sorry, we are not able to accept more patients!`);
        }

        let client = this.#clients.find(x => x.ownerName === ownerName);
        if(client !== undefined && (client.pets.find(x => x.petName === petName && x.procedures.length > 0))){
            throw new Error (`This pet is already registered under ${ownerName} name! ${petName} is on our lists, waiting for ${procedures.join(', ')}.`);
        }
        
        let pet = {
            petName,
            kind: kind.toLowerCase(),
            procedures
        }

        if(client === undefined){
            let newClient = {
                ownerName,
                pets: []
            }
            newClient.pets.push(pet);
            this.#clients.push(newClient);
        }else{
            if(client.pets.find(x => x.petName === petName)){
                client.pets[pet] = pet;
            }else{
            client.pets.push(pet);
        }}
        
        this.#currentWorkload++;
        return `Welcome ${petName}!`;
    }

    onLeaving (ownerName, petName) {
        let client = this.#clients.find(x => x.ownerName === ownerName);
        let pet = client.pets.find(x => x.petName === petName);
        if(client === undefined){
            throw new Error('Sorry, there is no such client!');
        }
        else if(pet === undefined || pet.procedures.length === 0){
            throw new Error(`Sorry, there are no procedures for ${petName}!`);
        }

        this.#totalProfit += pet.procedures.length * 500;
        pet.procedures = [];
        this.#currentWorkload--;

        return `Goodbye ${petName}. Stay safe!`;
    }

    toString (){
        let percentage = Math.floor(this.#currentWorkload / this.capacity * 100);
        let result = `${this.clinicName} is ${percentage}% busy today!\n`;
        result += `Total profit: ${this.#totalProfit.toFixed(2)}$\n`;

        this.#clients.sort((a, b) => a.ownerName.localeCompare(b.ownerName));
        
        this.#clients.forEach(x => {
            x.pets.sort((a, b) => a.petName.localeCompare(b.petName));
        });

       this.#clients.forEach( owner => {
           result += `${owner.ownerName} with:\n`;
           owner.pets.forEach(pet => {
               result += `---${pet.petName} - a ${pet.kind} that needs: ${pet.procedures.join(', ')}\n`;
           })}
       )
        return result.trim();
    }
}

let clinic = new VeterinaryClinic('SoftCare', 10);
clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['']);          
clinic.newCustomer('Anna Morgan', 'Max', 'Dog', ['SK456', 'DFG45', 'KS456'])
clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['AS888'])
//clinic.onLeaving('Jim Jones', 'Tiny');
console.log(clinic.toString());

let string = `SoftCare is 20% busy today!
Total profit: 500.00$
Anna Morgan with:
---Max - a dog that needs: SK456, DFG45, KS456
Jim Jones with:
---Tiny - a cat that needs: 
---Tom - a cat that needs: A154B, 2C32B, 12CDB`;