import { showError, showInfo } from '../notification.js';
import { request, getTrekById, edit as apiEdit, deleteTrek as apiDelete, like as apiLikes } from '../data.js';

export async function requestTrek(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/treks/request.hbs', this.app.userData);
}

export async function requestTrekPost() {
    try {
        if (this.params.location.length < 6 ) {
            throw new Error('Location should be at least 6 characters');
        }
        if (this.params.description.length < 10 ) {
            throw new Error('Description should be at least 10 characters');
        }

        const trek = {
            location: this.params.location,
            departureDate: this.params.dateTime,
            description: this.params.description,
            image: this.params.imageURL,
            organizer: localStorage.getItem('username'),
            likes: 0
        };

        const result = await request(trek);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Trek created successfully.');
        this.redirect('/');
    } catch (err) {
        console.error(err);
        showError('Invalid input');
    }
}

export async function details(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const trekId = this.params.id;

    let trek = await getTrekById(trekId);

    const context = Object.assign({ trek, origin: encodeURIComponent('#/details/' + trekId) }, this.app.userData);

    this.partial('./templates/treks/details.hbs', context);
}

export async function edit(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const trekId = this.params.id;

    let trek = await getTrekById(trekId);

    const context = Object.assign({ trek }, this.app.userData);

    this.partial('./templates/treks/edit.hbs', context);
}

export async function editPost(){
    const trekId = this.params.id;

    try {
        const trek = {
            location: this.params.location,
            image: this.params.image,
            description: this.params.description,
            departureDate: this.params.departureDate
        };

        const result = await apiEdit(trekId, trek);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Trek edited successfully.');
        this.redirect('/');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}

export async function deleteTrek() {
    const trekId = this.params.id;

    try {
        const result = await apiDelete(trekId);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('You closed the trek successfully.');

        this.redirect('/');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}

export async function likes() {
    const trekId = this.params.id;

    let  trek = await getTrekById(trekId);

    try {
        const result = await apiLikes(trek);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo(`You liked the trek successfully.`);

        this.redirect('/');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}