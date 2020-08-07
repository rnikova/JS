import { allRecipes } from '../data.js';

export default async function home(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        recipes: await this.load('./templates/recipes/recipe.hbs')
    };

    const recipes = await allRecipes();
    const context= Object.assign({ recipes: recipes}, this.app.userData);
    this.app.userData.recipes = context;

    this.partial('./templates/home.hbs', context);
}