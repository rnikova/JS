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

        this.get('/share', function(ctx){
            shared.setHeaderInfo(ctx);
            this.loadPartials(shared.getPartials())
                .partial('./views/recipes/share.hbs');
        });

        this.post('/share', function(ctx){
            const { meal, ingredients, prepMethod, description, foodImageURL, category } = ctx.params;
            const categories = {
                'Vegetables and legumes/beans': "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg",
                'Grain Food': 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
                'Fruits': 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
                'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
                'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
            };

            if (meal && ingredients && prepMethod && description && foodImageURL && category) {
                post("appdata", "recipes", {
                    meal, 
                    ingredients: ingredients.split(" "), 
                    prepMethod, 
                    description, 
                    foodImageURL, 
                    category,
                    likesCounter: 0,
                    categoryImageURL: categories[category]
                }, "Kinvey")
                    .then(() => {
                        ctx.redirect("/");
                    })
                    .catch(() => {console.error})
            }
        });

        this.get('/recipe:id', function(ctx){
            const id = ctx.params.id;
            shared.setHeaderInfo(ctx);
            get('appdata', `recipes/${id}`, 'Kinvey')
                .then(recipe => {
                    recipe.isCreator = sessionStorage.getItem('userId') === recipe._acl.creator;
                    ctx.recipe = recipe;
                    this.loadPartials(shared.getPartials())
                        .partial('../views/recipes/recipeDetails.hbs');
                })
                .catch(console.error);
        });

        this.get('/like/:id', function(ctx){
            const id = ctx.params.id;
            get('appdata', `recipes/${id}`, 'Kinvey')
                .then(recipe => {
                    recipe.likesCounter += 1;
                    put('appdata', `recipes/${id}`, 'Kinvey', recipe);
                })
                .then(recipe => ctx.redirect('/'))
                .catch(console.error)
        });

        this.get('/recipe/:id', function (ctx) {
            const id = ctx.params.id;
            shared.setHeaderInfo(ctx);
            const partials = loadAllPartials({});
    
            get('appdata', `recipes/${id}`, 'Kinvey')
                .then(recipe => {
                    recipe.ingredients = recipe.ingredients.join(' ');
                    ctx.recipe = recipe;
    
                    this.loadPartials(partials)
                        .partial('../views/recipe/recipeEdit.hbs')
                })
                .catch(() => {console.error});
        });
    
        this.post('/recipe/:id', function (ctx) {
            const id = ctx.params.id;
            const {meal, ingredients, prepMethod, description, foodImageURL, category } = ctx.params;
    
            const categories = {
                'Vegetables and legumes/beans': "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg",
                'Grain Food': 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
                'Fruits': 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
                'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
                'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
            }
    
            if (meal && ingredients && prepMethod && description && foodImageURL && category) {
                put("appdata", `recipes/${id}`, {
                    meal, 
                    ingredients: ingredients.split(" "), 
                    prepMethod, 
                    description, 
                    foodImageURL, 
                    category,
                    categoryImageURL: categories[category],
                }, "Kinvey")
                    .then(recipeInfo => {
                        ctx.redirect("/");
                    })
                    .catch(console.error);
            }
        });

        this.get("/recipe/:id/delete", function (ctx) {
            const id = ctx.params.id;
            del('appdata', `recipes/${id}`)
                .then(recipe => ctx.redirect('/'));
        })
    });
    app.run();
})()