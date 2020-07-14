import {get, post, put, del} from './requester.js';
import * as authHandler from './handlers/auth-handler.js';
import * as shared from './shared.js'

(() => {
    const app = Sammy('#rooter', function (){
        this.use('Handlebars', 'hbs');

        this.get('/', function (ctx) {
            shared.setHeaderInfo(ctx);
            const partials = shared.getPartials();
            if(ctx.isAuth){
                get('appdata', 'recipes', 'Kinvey')
                    .then((recipes) => {
                        ctx.recipes = recipes;
                        this.loadPartials(partials)
                            .partial('./views/recipes/home.hbs');
                    });
            }else{
                partials['homeAnonymous'] = './views/recipes/homeAnonymous.hbs';
                this.loadPartials(partials)
                    .partial('./views/recipes/home.hbs');
            }
        });

        this.get('/register', authHandler.getRegister);

        this.post('/register', authHandler.postRegister);

        this.get('/login', authHandler.getLogin);

        this.post('/login', authHandler.postLogin);

        this.get('/logout', authHandler.logout);
    });
    app.run();
})()