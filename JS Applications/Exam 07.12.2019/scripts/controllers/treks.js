import { showError, showInfo } from '../notification.js';
import { request } from '../data.js';

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