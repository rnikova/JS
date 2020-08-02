import { allTreks } from '../data.js';

export default async function home(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        trekList: await this.load('./templates/treks/trekList.hbs'),
        noTrek: await this.load('./templates/treks/noTrek.hbs')
    };

    const treks = await allTreks();
    const context= Object.assign({ treks: treks, allTreks: true }, this.app.userData);
    this.app.userData.treks = context;

    this.partial('./templates/home.hbs', context);
}