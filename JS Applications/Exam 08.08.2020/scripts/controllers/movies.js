import { showError, showInfo } from '../notification.js';
import { create as apiCreate, getMovieById, edit as apiEdit, deleteMovie as apiDelete, like } from '../data.js';

export async function create(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/movies/create.hbs', this.app.userData);
}

export async function createPost() {
    try {
        if (!this.params.title || !this.params.description || !this.params.imageUrl) {
            throw new Error('The title, description and image shouldn’t be empty');
        }

        const movie = {
            title: this.params.title,
            description: this.params.description,
            imageUrl: this.params.imageUrl,
            creator: this.app.userData.email,
            likes: 0
        };

        const result = await apiCreate(movie);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Created successfully!');
        this.redirect('/');
    } catch (err) {
        showError('Invalid input');
        console.error(err);
    }
}

export async function details(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movieId = this.params.id;

    let movie = await getMovieById(movieId);
    const isCreator = localStorage.getItem('userId') === movie.ownerId;
    const context = Object.assign({ movie, origin: encodeURIComponent('#/details/' + movieId), isCreator: isCreator }, this.app.userData);

    this.partial('./templates/movies/details.hbs', context);
}

export async function edit(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movieId = this.params.id;

    let movie = await getMovieById(movieId);

    const context = Object.assign({ movie }, this.app.userData);

    this.partial('./templates/movies/edit.hbs', context);
}

export async function editPost(){
    const movieId = this.params.id;

    try {
        const movie = {
            imageUrl: this.params.imageUrl,
            description: this.params.description,
            name: this.params.name
        };

        const result = await apiEdit(movieId, movie);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Eddited successfully');
        this.redirect(`#/details/${movieId}`);
    } catch (err) {
        showError(err.message);
        console.error(err);
    }
}

export async function deleteMovie() {
    const movieId = this.params.id;

    try {
        const result = await apiDelete(movieId);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Deleted successfully');

        this.redirect('/');
    } catch (err) {
        showError(err.message);
        console.error(err);
    }
}

export async function likes() {
    const movieId = this.params.id;

    let  movie = await getMovieById(movieId);

    try {
        const result = await like(movie);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo(`Liked successfully`);

        this.redirect(`#/details/${movieId}`);
    } catch (err) {
        showError(err.message);
        console.error(err);
    }
}