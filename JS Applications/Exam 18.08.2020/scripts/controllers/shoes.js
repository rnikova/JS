import { create as apiCreate, getShoesById, edit as apiEdit, buy as apiBuy, deleteShoes as apiDelete } from '../data.js';

export async function create(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/shoes/create.hbs', this.app.userData);
}

export async function createPost() {
    try {
        const shoes = {
            name: this.params.name,
            price: parseFloat(this.params.price),
            imageUrl: this.params.imageUrl,
            description: this.params.description,
            brand: this.params.brand,
            creator: this.app.userData.email,
            people: []
        };

        const result = await apiCreate(shoes);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('/');
    } catch (err) {
        console.error(err);
    }
}

export async function details(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const shoesId = this.params.id;

    let shoes = await getShoesById(shoesId);
    const isCreator = localStorage.getItem('userId') === shoes.ownerId;
    const context = Object.assign({ shoes, origin: encodeURIComponent('#/details/' + shoesId), isCreator: isCreator }, this.app.userData);

    this.partial('./templates/shoes/details.hbs', context);
}

export async function edit(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const shoesId = this.params.id;

    let shoes = await getShoesById(shoesId);

    const context = Object.assign({ shoes }, this.app.userData);

    this.partial('./templates/shoes/edit.hbs', context);
}

export async function editPost(){
    const shoesId = this.params.id;

    try {
        const shoes = {
            name: this.params.name,
            price: parseFloat(this.params.price),
            imageUrl: this.params.imageUrl,
            description: this.params.description,
            brand: this.params.brand
        };

        const result = await apiEdit(shoesId, shoes);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect(`#/details/${shoesId}`);
    } catch (err) {
        console.error(err);
    }
}

export async function buy() {
    const shoesId = this.params.id;

    let  shoes = await getShoesById(shoesId);

    try {
        const result = await apiBuy(shoes);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect(`#/details/${shoesId}`);
    } catch (err) {
        console.error(err);
    }
}

export async function deleteShoes() {
    const shoesId = this.params.id;

    try {
        const result = await apiDelete(shoesId);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('/');
    } catch (err) {
        console.error(err);
    }
}