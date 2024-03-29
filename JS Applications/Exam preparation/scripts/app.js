/* globals Sammy */
import home from './controllers/home.js';
import register, { registerPost } from './controllers/register.js';
import login, { loginPost } from './controllers/login.js';
import logout from './controllers/logout.js';
import { create, createPost, details, edit, editPost, deleteRecipe, likes } from './controllers/recipes.js';

window.addEventListener('load', () => {
    const app = Sammy('#rooter', function(){
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: localStorage.getItem('username') || '',
            userId: localStorage.getItem('userId') || '',
        };

        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        this.get('#/register', register);
        this.get('#/login', login);
        this.get('#/logout', logout);
        this.post('#/register', ctx => { registerPost.call(ctx); });
        this.post('#/login', ctx => { loginPost.call(ctx); });

        this.get('#/create', create);
        this.post('#/create', ctx => { createPost.call(ctx); });
        this.get('#/details/:id', details);
        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', ctx => { editPost.call(ctx); });
        this.get('#/delete/:id', deleteRecipe);
        this.get('#/like/:id', likes);
    })

    app.run();
});