import { showError, showInfo } from '../notification.js';
import { create as apiCreate, getRecipeById, edit as apiEdit, deleteRecipe as apiDelete, likes as apiLikes } from '../data.js';

export async function create(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/recipes/share.hbs', this.app.userData);
}

export async function createPost() {
    try {
        const recipe = {
            meal: this.params.meal,
            category: this.params.category,
            foodImageURL: this.params.foodImageURL,
            description: this.params.description,
            prepMethod: this.params.prepMethod,
            ingredients: this.params.ingredients
        };

        const result = await apiCreate(recipe);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Recipe shared successfully!');
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

    const recipeId = this.params.id;

    let recipe = await getRecipeById(recipeId);
    const isCreator = localStorage.getItem('userId') === recipe.ownerId;
    const context = Object.assign({ recipe, origin: encodeURIComponent('#/details/' + recipeId), isCreator: isCreator }, this.app.userData);

    this.partial('./templates/recipes/details.hbs', context);
}

export async function edit(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const recipeId = this.params.id;

    let recipe = await getRecipeById(recipeId);

    const context = Object.assign({ recipe }, this.app.userData);

    this.partial('./templates/recipes/edit.hbs', context);
}

export async function editPost(){
    const recipeId = this.params.id;

    try {
        const recipe = {
            meal: this.params.meal,
            category: this.params.category,
            foodImageURL: this.params.foodImageURL,
            description: this.params.description,
            prepMethod: this.params.prepMethod,
            ingredients: this.params.ingredients
        };

        const result = await apiEdit(recipeId, recipe);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('/');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}

export async function deleteRecipe() {
    const recipeId = this.params.id;

    try {
        const result = await apiDelete(recipeId);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Your recipe was archived.');

        this.redirect('/');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}

export async function likes() {
    const recipeId = this.params.id;

    let  recipe = await getRecipeById(recipeId);

    try {
        const result = await apiLikes(recipe);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo(`You liked that recipe.`);

        this.redirect('/');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}