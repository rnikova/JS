import { allMovies } from '../data.js';

export default async function home(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const movies = await allMovies();
    const context= Object.assign({ movies: movies}, this.app.userData);
    this.app.userData.movies = context;

    this.partial('./templates/home.hbs', context);
}