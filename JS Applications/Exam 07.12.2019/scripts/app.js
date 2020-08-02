/* globals Sammy */
import home from './controllers/home.js';
import register, { registerPost } from './controllers/register.js';
import login, { loginPost } from './controllers/login.js';
import logout from './controllers/logout.js';
import { requestTrek, requestTrekPost } from './controllers/treks.js';

window.addEventListener('load', () => {
    const app = Sammy('#container', function(){
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: localStorage.getItem('username') || '',
            userId: localStorage.getItem('userId') || ''
        };

        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        this.get('#/register', register);
        this.get('#/login', login);
        this.get('#/logout', logout);

        this.post('#/register', ctx => { registerPost.call(ctx); });
        this.post('#/login', ctx => { loginPost.call(ctx); });

        this.get('#/requestTrek', requestTrek);
        this.post('#/requestTrek', ctx => { requestTrekPost.call(ctx); });
    });

    app.run();
})