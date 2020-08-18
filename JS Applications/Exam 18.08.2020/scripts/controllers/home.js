import { allShoes } from '../data.js';

export default async function home(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        allShoes: await this.load('./templates/shoes/allShoes.hbs'),
    };

    const shoes = await allShoes();
    const context= Object.assign({ shoes: shoes, allShoes: true}, this.app.userData);
    this.app.userData.shoes = context;

    this.partial('./templates/home.hbs', context);
}